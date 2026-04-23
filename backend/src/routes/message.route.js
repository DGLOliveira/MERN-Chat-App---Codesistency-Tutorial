import express from 'express'
import { getUsers, sendMessage, getMessages } from '../controllers/message.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get("/users", protectRoute, getUsers)

router.post("/send", protectRoute, sendMessage)

router.get("/:id", protectRoute, getMessages)

export default router