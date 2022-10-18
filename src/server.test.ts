import supertest from "supertest"
import app from "./app"
import {prismaMock} from "./lib/prisma/client.mock"

const request = supertest(app)

test("GET /planets", async () =>{
    const
    const response = await request
    .get("/planets")
    .expect(200)
    .expect("Content-Type", /application\/json\);

expect(responce.body).toEqual([
    {name: "Mercury"},
    {name: "Venus"}
])
})



