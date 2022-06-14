
const routes=require("express").Router()
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
//---------------------------------------------------------------------------------------
// get seller

const getseller=async(req,res)=>{
  try {
    const sellerData=await prisma.seller.findMany({include:{products:true}})
    // console.log(sellerData)
    res.send(sellerData)
  } catch (error) {
    res.send(error)
  }
}

const getsellerbyId=async(req,res)=>{
  try {
    const id=req.params.id
    // console.log(id)
    const sellerData=await prisma.seller.findUnique({where:{id:parseInt(id)},include:{products:true}})
    res.send(sellerData)
  } catch (error) {
    res.send(error.messege)
    
  }

}
// ---------------------------------------------------------------------------------------
// create seller
const createSeller=async(req,res)=>{
  try {
    const {
      name,
  email,
  gst_number,
  phone_number 
    }=req.body
    console.log(name,email,gst_number,phone_number);
    await prisma.seller.create({data:{name,email,gst_number,phone_number
      }})
    res.send("your data has been added succsefuly")
    
  } catch (err) {
    console.log(err.message)
    res.send(err.message)
    
  }
}

module.exports={getseller,getsellerbyId,createSeller}