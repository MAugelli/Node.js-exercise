import express from "express"
import "express-async-errors"
import planetsRoutes from "./routes/planet"
import { ValidationErrorMiddleware } from "./lib/middleware/validation"
import { initCorsMiddleware } from "./lib/middleware/cors"
import { initSessionMiddleware } from "./lib/middleware/session"
import { passport } from "./lib/middleware/passport"
import authRoutes from "./routes/auth"

const app = express()

app.use(initSessionMiddleware())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use("/planets", planetsRoutes)
app.use("/auth", authRoutes)
app.use(ValidationErrorMiddleware)
app.use(initCorsMiddleware())

export default app
