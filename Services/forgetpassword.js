const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
const userInfo=async(email)=>{
  try {
    const user=await prisma.user.findFirst({where:{email}})
    return user
  } catch (error) {
    return error
    
  }
}







module.exports={userInfo}