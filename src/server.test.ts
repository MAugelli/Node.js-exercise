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
        .expect("Content-Type", /application\/json\);

    expect(response.body).toEqual(planets)
    })
})

describe("POST /planets", async () => {
    test("Valid request", async () =>{
        const planet =
            {
                name: "Mercury",
                diameter: 1234,
                moons: 12,
            }

        const response = await request
        .post("/planets")
        .send(planet)
        .expect(201)
        .expect("Content-Type", /application\/json\);

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





