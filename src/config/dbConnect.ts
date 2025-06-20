import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose" ; 

export const connectDb = ()=>{
    try{
        const dbUrl : string = process.env.MONGO_URI ; 
         mongoose.connect(dbUrl) ; 
        mongoose.connection.on('connected',()=>{
            console.log("database connected successfully") ; 
        })

        mongoose.connection.on('disconnected' , ()=>{
            console.log("database disconnected successfully") ; 
        })

        mongoose.connection.on('error' , ()=>{
            console.log("database connection error") ; 
        })  
    }catch(error){
        console.log(`Error in connecting database ${error}`);
    }
}