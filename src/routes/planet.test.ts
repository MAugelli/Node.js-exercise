import supertest from "supertest"
import app from "./app"
import {prismaMock} from "./lib/prisma/client.mock"

const request = supertest(app)

describe("GET /planets", async () => {
    test("Valid request", async () =>{
        const planets = [
            {
                id: 2,
                name: "Venus",
                description: null,
                diameter: 6543,
                moons: 5,
                createAt: "2022-10-18T17:14:40.960Z",
                updetedAt: "2022-10-18T17:14:03.263Z"
            },
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createAt: "2022-10-18T17:13:55.850Z",
                updetedAt: "2022-10-18T17:14:40.960Z"
            }
        ]

        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets)

        const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json\)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080")
        .expect("Access-Control-Allow-Credentials", "true")

    expect(response.body).toEqual(planets)
    })
})

describe("GET /planets/:id", async () => {
    test("Valid request", async () =>{
        const planet =
            {
                id: 2,
                name: "Venus",
                description: null,
                diameter: 6543,
                moons: 5,
                createAt: "2022-10-18T17:14:40.960Z",
                updetedAt: "2022-10-18T17:14:03.263Z"
            }

        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet)

        const response = await request
        .get("/planets/2")
        .expect(200)
        .expect("Content-Type", /application\/json\)
        .expert("Access-Control-Allow-Origin, http://localhost:8080");


    expect(response.body).toEqual(planet)
    })

    test("Planet doea not exist", async ()=>{
        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null)

        const response = await request
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html\);

        expect(response.text).toContain("Cannot get /planets/23")
    })

    test("Invalid planet ID", async ()=>{

        const response = await request
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html\);

        expect(response.text).toContain("Cannot get /planets/23")
    })
})

describe("POST /planets", async () => {
    test("Valid request", async () =>{
        const planet ={
            id: 4,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createAt: "2022-10-20T09:44:09.013Z",
            updetedAt: "2022-10-20T09:44:09.013Z"
        }

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet)

        const response = await request
        .post("/planets")
        .send(
            {
                name: "Mercury",
                diameter: 1234,
                moons: 12,
            }

        )
        .expect(201)
        .expect("Content-Type", /application\/json\)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080")
        .expect("Access-Control-Allow-Credentials", "true")


    expect(response.body).toEqual(planet)
    })

    test("Invalid request", async () =>{
        const planet =
            {
                diameter: 1234,
                moons: 12,
            }

        const response = await request
        .post("/planets")
        .send(planet)
        .expect(422)
        .expect("Content-Type", /application\/json\);

    expect(response.body).toEqual({
        error:{
            body: expect.any(Array)
        }
    })
    })
})

describe("PUT /planets/:id", async () => {
    test("Valid request", async () =>{
        const planet ={
            id: 4,
            name: "Mercury",
            desciption: "Nice planet",
            diameter: 1234,
            moons: 12,
            createAt: "2022-10-20T09:44:09.013Z",
            updetedAt: "2022-10-20T09:44:09.013Z"
        }

        // @ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet)

        const response = await request
        .put("/planets/4")
        .send(
            {
                name: "Mercury",
                desciption: "Nice planet",
                diameter: 1234,
                moons: 12,
            }

        )
        .expect(200)
        .expect("Content-Type", /application\/json\)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080")
        .expect("Access-Control-Allow-Credentials", "true")


    expect(response.body).toEqual(planet)
    })

    test("Invalid request", async () =>{
        const planet =
            {
                diameter: 1234,
                moons: 12,
            }

        const response = await request
        .put("/planets/23")
        .send(planet)
        .expect(422)
        .expect("Content-Type", /application\/json\);

    expect(response.body).toEqual({
        error:{
            body: expect.any(Array)
        }
    })
    })

    test("Planet doea not exist", async ()=>{
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"))

        const response = await request
            .put("/planets/23")
            .send({
                name: "Mercury",
                desciption: "Nice planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(404)
            .expect("Content-Type", /text\/html\);

        expect(response.text).toContain("Cannot PUT /planets/23")
    })

    test("Invalid planet ID", async ()=>{

        const response = await request
            .put("/planets/asdf")
            .send({
                name: "Mercury",
                desciption: "Nice planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(404)
            .expect("Content-Type", /text\/html\);

        expect(response.text).toContain("Cannot PUT /planets/23")
    })
})

describe("POST /planets/:id/photo", () => {
    test("Valid request with PNG file upload", async () => {
        await request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.png")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080")
            .expect("Access-Control-Allow-Credentials", "true")
    })

    test("Invalid planet ID", async () => {
        const response = await request
            .post("/planets/asdf/photo")
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot POST /planets/asdf/photo")
    })

    test("Invalid request with no file upload", async () => {
        const response = await request
            .post("/planets/23/photo")
            .expect(400)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("No photo file uploaded.")
    })

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const response = await request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.png")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot POST /planets/23/photo");
    })

    test("Valid request with JPG file upload", async () => {
        await request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    })

    test("Invalid request with text file upload", async () => {
        const response = await request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.txt")
            .expect(500)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Error: The uploaded file must be a JPG or a PNG image.");
    })
});

