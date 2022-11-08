import express from "express"
import "express-async-errors"
import planetsRoutes from "./routes/planet"
import { validationErrorMiddleware } from "./lib/middleware/validation"
import { initCorsMiddleware } from "./lib/middleware/cors"

const app = express()


app.use(express.json())
app.use("/planets", planetsRoutes)
app.use(ValidationErrorMiddleware)
app.use(initCorsMiddleware());

export default app
