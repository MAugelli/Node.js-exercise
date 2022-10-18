import supertest from "supertest"
import app from "./app"
import {prismaMock} from "./lib/prisma/client.mock"

const request = supertest(app)

test("GET /planets", async () =>{
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

expect(responce.body).toEqual(planets)
})



