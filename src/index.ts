import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/dbConnect";
dotenv.config()
const PORT = process.env.PORT || 3000 ; 
const app = express(); 


connectDb();

app.listen(PORT , ()=>{
    console.log(`Server are running on port ${PORT}`);
})