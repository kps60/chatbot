import { NextFunction, Response, Request } from "express"
import User from "../models/User.js";
import { configureOpenAi } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
export const genrateChatComplition = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({ message: "user not registered ir token mal function" })
        }
        //grap all chats of user 
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[]
        chats.push({ content: message, role: "user" })
        user.chats.push({ content: message, role: "user" })
        //send all chats to OPENAI API with new once
        const config = configureOpenAi()
        const openai = new OpenAIApi(config)
        const chatresponse = await openai.createChatCompletion({
            model: "gpt-3.5",
            messages: chats,
        })
        user.chats.push(chatresponse.data.choices[0].message)
        await user.save()
        //get latest response
        return res.status(200).json({ chats: user.chats })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Somehing went wrong", cause: error.message })
    }
}