import express from "express" ; 
import userSignup from "../controller/authController.js";
import  userLogin  from "../controller/authLogin.js";

const Routes = express.Router();


Routes.post("/SignupUser", userSignup)
Routes.post("/signin",userLogin)

export default Routes ; 