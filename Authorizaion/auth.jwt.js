
const jwt=require("jsonwebtoken")
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()

const generateToken=(id)=>{
  return jwt.sign(id,"shubham")
}

const verifiedToken=async(req,res,next)=>{
  
  try {
    const{id}=req.body
    const token=req.headers.authorization
  
      const userData=await prisma.user.findUnique({where:{id:parseInt(id)}})
      console.log(token.split(" ")[1])
      if(userData.token==token.split(" ")[1]){
        next()
      }else{
        res.send("Invalid Token")
      }
    

  } catch (error) {
    res.send(error.message)
  }
}

module.exports={generateToken,verifiedToken}