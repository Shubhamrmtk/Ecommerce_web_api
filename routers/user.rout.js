const { createUser,Verifyuser,getUser,forgetpassword,setPassword } = require("../controller/user.controller")
const {loginUser}=require("../Authorizaion/user.login")
const {verifiedToken}=require("../Authorizaion/auth.jwt")

const routes=require("express").Router()

routes.post("/user",createUser)
routes.post("/user/verify",Verifyuser)
routes.post("/user/login",loginUser)
routes.get("/user",verifiedToken,getUser)
routes.post("/forgetpassword",forgetpassword)
routes.post("/setpassword",setPassword)


module.exports=routes