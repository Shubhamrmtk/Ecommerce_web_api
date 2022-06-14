const express=require('express')
const app=express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


app.use("/ecommerce",require("./routers/seller.route"))
app.use("/ecommerce",require("./routers/product.route"))
app.use("/ecommerce",require("./routers/user.rout"))
app.use("/ecommerce",require("./routers/order.route"))
app.use("/ecommerce",require("./routers/router.radis"))



app.listen(3000,()=>{
  console.log(`your now connected to port 3000`)
})