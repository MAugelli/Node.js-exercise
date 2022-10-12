import express from "express"
import "express-async-errors"

const app = express()

app.get("/F1Team",(request, response) => {
    response.json([
        {name: "Ferrari"},
        {name: "Haas"}
    ])
})

export default app
