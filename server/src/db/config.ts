import { connect, disconnect,set } from "mongoose"

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
        set("strictQuery",true)
    } catch (error) {
        console.log(error.message)
        throw new Error("cannot connect to mongoDB")
    }
}

async function disconnectToDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error.message);
        throw new Error("cannot connect to mongoDB")
    }
}

export { connectToDatabase, disconnectToDatabase }
