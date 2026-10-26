import app from "./app"
import { connectDB } from "./config/db"
import { env } from "./config/env"


//connecting db


connectDB()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server is running on http://localhost:${env.PORT}`)
    })
  })
  .catch( (err:Error) => {
    console.error("fail to connect DB...", err.message)
    process.exit(1)
  })