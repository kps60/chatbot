import express from "express";
import { config } from "dotenv";
import morgan from "morgan"
import cors from "cors"
// import appRouter from "./routes/index.js"
import { connectToDatabase } from "./db/config.js";
import userRoutes from "./routes/user-routers.js";
import chatRoutes from "./routes/chat-routers.js";
import cookieParser from "cookie-parser";


const app = express()
config()
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
// middlewares
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
//remove it in production mode
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send('This is a chatbot api')
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chats', chatRoutes);

const PORT = process.env.PORT || 5000
//connections and listeners
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT} and connect to DataBase`)
    })
  }).catch(err => console.log(err));
