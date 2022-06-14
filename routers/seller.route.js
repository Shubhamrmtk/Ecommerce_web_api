const routes=require("express").Router()
const {getseller,getsellerbyId,createSeller}=require("../controller/seller.controller")


routes.get("/seller",getseller)


routes.get("/seller/:id",getsellerbyId)

routes.post("/seller",createSeller)

module.exports=routes

