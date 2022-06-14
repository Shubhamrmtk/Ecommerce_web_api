const{PrismaClient}=require('@prisma/client')
const rzp = require('../Services/razoroay.service')
const prisma=new PrismaClient()

const getOrders=async(req,res)=>{
  try {
    // console.log("hey")
    const{productIds,userId}=await req.body
    // console.log(req.body)
    // console.log(userId)
    const products=await prisma.product.findMany({where:{id:{in:productIds}}})
    console.log(products)
    const total=products.reduce((acc,x)=>{
      if(x.is_discounted){
        acc=acc+x.discounted_price
      }else{
        acc=acc=x.price
      }
      return acc
    },0)
    // console.log(total)
    const order=await prisma.order.create({data:{productIds,userId:parseInt(userId),total:parseInt(total)}})
    // console.log(order)
    let rzpOrder;
    rzpOrder=await rzp.orders.create({
      amount:total,
      currency:"INR",
      receipt:order.id
    })
    console.log(rzpOrder,"rzp")
    const{id:rzpId,amount,receipt}=rzpOrder;
    res.status(200).json({status:"succes",rzpId,amount,receipt})
    // res.send("your order is placed ")
  } catch (error) {
    res.send(error.message)
    
  }
}



module.exports={getOrders}