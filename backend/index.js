import express from "express" ; 
import dotenv from "dotenv";
import Routes from "./routes/authroute.js";
import { connectDb } from "./DataBase/connectDB.js";


const app = express(); 
dotenv.config(); 

// Middleware to parse JSON request bodies
 app.use(express.json());

// Routes 
app.use("/api", Routes);


// DATA BASE CONNECTION 
connectDb() ; 

    
//listening port number 
const port = process.env.PORT || 3000;

 app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })