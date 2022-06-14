const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
const{generateToken}=require("./auth.jwt")

const loginUser=async(req,res)=>{
  try {
    const{email,password}=req.body
    const userData=await prisma.user.findUnique({where:{email}})
    if(userData.password==password){
      if(userData.verified){
        const token=generateToken(userData.id)
        await prisma.user.update({where:{email},data:{token}})
        res.send(`your sucssefuly login your token is${token} and ID ${userData.id}`)
      }else{
        res.send("your not verified to access the protected route please verfiy yourself first")
      }

    }else{
      res.send(`invalid password`)
    }
  } catch (error) {
    res.send(error.message)
    
  }
}


module.exports={loginUser}