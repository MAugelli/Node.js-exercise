import supertest from "supertest"
import app from "./app"

const request = supertest(app)

test("GET /F1Team", async () =>{
    const response = await request
    .get("/planets")
    .expect(200)
    .expect("Content-Type", /application\/json\);

expect(responce.body).toEqual([
    {name: "Ferrari"},
    {name: "Haas"}
])
})



