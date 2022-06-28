const {PrismaClient}=require("@prisma/client")
var newOTP = require('otp-generators')
const { generateToken,verifyTokenforpssword} = require("../Authorizaion/auth.jwt")
const prisma=new PrismaClient()
const {transporter}=require("../OTP/otp_generator")
const {userInfo} =require("../Services/forgetpassword")
const client=require("../Radis/radis")


// ----------------------------------------------------------------------------------
const createUser=async(req,res)=>{
  try {
    const{name,email,password,phoneNumber,dob,role}=req.body
    console.log(req.body)
    const otp= await newOTP.generate(6, { alphabets: false, upperCase: false, specialChar: false })
    console.log(otp)
    await prisma.user.create({data:{name,email,password,phoneNumber,role,otp}})
    var mailOptions = {
      from: 'Ecommerce Node App',
      to: `${email}`,
      subject: 'Sending Email using Node.js',
      text:`${otp}`
    };
   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send(`Your Account is created please login with ${otp} this otp`)
  } catch (error) {
    res.send(error.message)
    
  }
}
// ------------------------------------------------------------------------
const Verifyuser=async(req,res)=>{
  try {
    const {otp,email,}=req.body
    const userData=await prisma.user.findMany({where:{email}})
    if (!userData.length>0){
      res.send("Your Information doese't exits in data base")
    }else{
      if(userData[0].otp==otp){
        await prisma.user.update({where:{email},data:{verified:true}})
        res.send("Your now verified")
      }else{
        res.send("Invalid otp")
      }
    }

  } catch (error) {
    res.send(error.message)
    
  }
}
// ---------------------------------------------------------------

const getUser=async(req,res)=>{

  try {
    const userData=await prisma.user.findMany({})
    res.send(userData)
    
  } catch (error) {
    res.send(error.message)
    
  }
}
// ---------------------------------------------------------------
const forgetpassword=async(req,res)=>{
  const{email}=req.body
  try {
    if (!email){
      res.status(400).json({mgs:"email is needed"})
    }
    const userDatails=await userInfo(email)
    if (!userDatails){
      res.send("Invalid Email")
    }
    const token=generateToken(userDatails.id)
    client.setEx("token",100,token)
    res.send(token)

  } catch (error) {
    res.send(error.message)
    
  }
}
// --------------------------------------------------------
const setPassword=async(req,res)=>{
  try {
    const{password,conformPassword,token}=req.body
    if(!(password==conformPassword)){
     return res.send(`your password and conforme password should be same`)
    }

    const rtoken=await client.get("token")
    if(rtoken==token){
      const id=await verifyTokenforpssword(token)
      await prisma.user.update({where:{id:parseInt(id)},data:{password}})
      return res.send(`your password is updated `)

    }
    return res.send('token is expired or wrong token')

  } catch (error) {
    res.send(error.message)
    
  }
}

module.exports={createUser,Verifyuser,getUser,forgetpassword,setPassword}