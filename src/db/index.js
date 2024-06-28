import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connect_DB = async()=>{
    try {
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected successfully, and DB Host is : ${connectionInstant.connection.host}`)
    } catch (error) {
        console.log("MongoDB Connection error",error)
        process.exit(1);
    }
}

export default connect_DB