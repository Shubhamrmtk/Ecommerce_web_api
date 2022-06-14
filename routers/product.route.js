const routes=require("express").Router()
const {getProduct,getProductbyId,createProduct,updateProduct,delteProduct}=require("../controller/product.controller")
const uplods=require("../utils/multer")

routes.get("/products",getProduct)
  // -------------------------------------------------------------------------------
  routes.get("/products/:id",getProductbyId)
  // ----------------------------------------------------------------------
  // create product
  routes.post("/seller/:sellerId/product",uplods.array("images"),createProduct)
  // --------------------------------------------------------------------------------------------
  // updating product
  routes.patch("/product/:productId",updateProduct)
  // --------------------------------------------------------------------------------------------
  routes.delete("/delete/product/:id",delteProduct)


  module.exports=routes
  
  
  