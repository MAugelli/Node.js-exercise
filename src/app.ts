import express from "express"
import "express-async-errors"
import prisma from "./lib/prisma/client"
import { validate, ValidationErrorMiddleware, planetSchema, PlanetData } from "./lib/validation"
import cors from "cors"
import { initMulterMiddlewere } from "./lib/middleware/multer"

const upload = initMulterMiddlewere()

const corsOption = {
    origin: "http://localhost:8080"
}

const app = express()
app.use(express.json())
app.use(cors(corsOption))

app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany()

    response.json(planets)
})

app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id)
    const planet = await prisma.planet.findUnique({
        where: {id: planetId}
    })

    if (!planet) {
        response.status(404)
        return next(`Cannot GET /planets/${planetId}`)
    }

    response.json(planet)
})


app.post("/planets", validate({ body: planetSchema }), async (request, response) => {
    const planetData : PlanetData = request.body;

    const planet = await prisma.planet.create({
        data: planetData
    })

    response.status(201).json(planet)
})

app.put("/planets/:id(\\d+)", validate({ body: planetSchema }), async (request, response, next) => {
    const planetId = Number(request.params.id)
    const planetData : PlanetData = request.body;

    try{
        const planet = await prisma.planet.update({
            where: {id: planetId},
            data: planetData
        })

        response.status(200).json(planet)
    }catch(error){
        response.status(404)
        next(`Cannot PUT /planets/${planetId}`)
    }
})

app.delete("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id)


    try{
        await prisma.planet.delete({
            where: {id: planetId},
        })

        response.status(204).end()
    }catch(error){
        response.status(404)
        next(`Cannot DELETE /planets/${planetId}`)
    }
})

app.post("/planets/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {


        if (!request.file) {
            response.status(400)
            next("No photo file uploaded")
        }

    const photoFilename = request.file.fieldname

    response.status(201).json({photoFilename})
})

app.use(ValidationErrorMiddleware)

export default app
