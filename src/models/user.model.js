import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // to enable search in database
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String ,//cloudNary URL
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref : "Video",
            }
        ],
        password :{
            type : String,
            required: [true,'password is required']
        },
        refreshToken :{
            type : String
        }
    },
    {
        timestamps: true 
    }
)
//we can't use arrow function in pre as they dont provide with 'this' 
//since encryption takes time we use async
//since pre is a middleware we use next
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){ //isModified me sab string me hi accept hota h
        next()
    }
    this.password = bcrypt.hash(this.password,10) //10 is hash rounds
    next()
})
/*
So basically, every time i save my any kind of details so my password will get 
enctypted...which  i don't want....i want that whenever i change password then 
encrypt it...otherwise let it be same encrypted string...so for that we added 
the if condition where we said if the pass is not modified move to next 
middleware
*/

userSchema.methods.isPasswordCorrect = async function(password){
    return await  bcrypt.compare(password,this.password)//returns boolean value
}
/* 
We created our function to check if the value provided through user is correct 
or not through bcrypt compare who is  gonna compare password with encrypted 
password as it knows how to decrypt and check it...if it matches it return true
*/

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this.id,
            email : this.email,
            username : this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )//generate token
}
userSchema.methods.refreshAccessToken = function(){
    return jwt.sign(
        {
            _id:this.id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model('User', 'userSchema') 
