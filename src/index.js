import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connect_DB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path : "./env"
    }
)

// way to connect to database

// import express from 'express'
// const app = express()

// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log(error)
//             throw error
//         })
//         app.listen(`${process.env.PORT}`,()=>{
//             console.log("App is listening to port");
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })()

connect_DB()