const { getOrders } = require("../controller/order.controller")

const routes=require("express").Router()

routes.post("/order",getOrders)


module.exports=routes