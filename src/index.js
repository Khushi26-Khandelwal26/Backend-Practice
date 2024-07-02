import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connect_DB from "./db/index.js";
import dotenv from "dotenv";
import {app} from './app.js'

dotenv.config(
    {
        path : "./env"
    }
)

// way to connect to database



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
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
        
    })
    app.on("error",(error)=>{
        console.log("error in connecting with express",error)
    })
})
.catch((err)=>(
    console.log("MongoDb Connection Failed",err)
))
