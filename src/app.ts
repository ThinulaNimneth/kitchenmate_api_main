import cors from "cors"
import express from "express"
import helmet from "helmet"
import { env } from "./config/env"
import { errorHandler, notFound } from "./middleware/error.middleware"
import routes from "./routes"


const app = express()

//correct ips
app.set("trust proxy", 1)

app.use(helmet())

app.use(
  cors({
    origin: (origin, callback) => {
      // allowed front end
      if (!origin || env.CLIENT_URLS.includes(origin)) return callback(null, true)
      return callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
    credentials: true
  })
)
app.use(express.json({limit: "100kb"}))

app.get("/", (_req, res) => {
  res.json({ success: true, message: "KitchenMate API", docs: "/api/health" })
})

app.use("/api", routes)

app.use(notFound)
app.use(errorHandler)


export default app