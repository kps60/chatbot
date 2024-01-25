import { Router } from "express"
import { verifyToken } from "../utils/token-manager.js"
import { chatValidator, validate } from "../utils/validators.js"
import { genrateChatComplition } from "../controllers/chats-controllers.js"

const chatRoutes = Router()

chatRoutes.post("/new", validate(chatValidator), verifyToken, genrateChatComplition)
export default chatRoutes