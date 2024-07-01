import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit :"16kb"})) 
// configuration of accepting max 16kb json data

//extended is used to give objects in objects
app.use(express.urlencoded({extended:true,
                            limit : "16kb"
                        }))
//to store images on server
app.use(express.static("public"))
app.use(cookieParser())

export {app}