import {Router} from "express"



const router = Router()


router.get("/health", (_req, res) => {
  res.json({ success: true, message: "Kitchenmate API is running", timestamp: new Date().toISOString() })
})





export default router