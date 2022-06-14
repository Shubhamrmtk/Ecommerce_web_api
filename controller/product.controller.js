const{PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()

const getProduct=async(req,res)=>{

  try {
    const product=await prisma.product.findMany({include:{seller:true}})
    res.send(product)
    
  } catch (error) {
    res.send(error.messege)
    
  }
  
  }

const getProductbyId=async(req,res)=>{
  try {
    const id=req.params.id
    const product=await prisma.product.findUnique({where:{id:parseInt(id)}})
    res.send(product)
  } catch (error) {
    res.send(error.messege)
    
    
  }
}

const createProduct=async(req,res)=>{
  try {
  
    const {name,description,price,category,in_stock,is_discounted,discounted_price}=req.body
    const images=req.files.map((elm)=>{return elm.path})
    const d=await prisma.product.create({data:{name,description,price:parseInt(price),category,in_stock:Boolean(in_stock),is_discounted:Boolean(is_discounted),images,seller_id:parseInt(req.params.sellerId),discounted_price:parseInt(discounted_price)}})
    res.send(req.files)

    
  } catch (error) {
    res.send(error.message)
    
  }
}

const updateProduct=async(req,res)=>{
  try {
    await prisma.product.update({where:{id:parseInt(req.params.productId)},data:req.body})
    res.send(`your data is updeted succsesfuly`)
    
  } catch (error) {
    res.send(error.message)
    
  }
}


const delteProduct=async(req,res)=>{
  try {
    await prisma.product.delete({where:{id:parseInt(req.params.id)}})
    res.send(`your product is deleted `)
    
  } catch (error) {
    
    res.send(error.message)
  }


}

module.exports={getProduct,getProductbyId,createProduct,updateProduct,delteProduct}