import mongoose , {Schema}from "mongoose";
import bcrypt from "bcrypt";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";

const studentSchema = new Schema({
    username: {
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String, 
        required:true,
        unique: true,
        trim: true,
    }
    ,
    scholar_ID:{ 
        type:Number,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    avatar:{
        type:String, //Cloudinary URL maybe
        required:true,

    },
    refreshToken:{
        type:String
    }
})

studentSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password= await bcrypt.hash(this.password,10)
    next()
})

studentSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

studentSchema.methods.generateAccessToken=function(){
     return jwt.sign({
        _id:this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}
studentSchema.methods.generateRefreshToken=function(){
    return jwt.sign({  
       _id:this._id
   },
   process.env.REFRESH_TOKEN_SECRET,
   { expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}

 
studentSchema.plugin(mongooseAggregatePaginate)

export const User= mongoose.model("User",studentSchema)