const routes=require("express").Router()
const client=require("../Radis/radis")
const axios =require("axios")
const cli = require("nodemon/lib/cli")
routes.get("/data",async(req,res)=>{
  try {
    const data=await client.get("todos")
    if(data){
      res.send(JSON.parse(data))
    }else{
      const todo=await axios.get('https://jsonplaceholder.typicode.com/todos')
      client.setEx("todos",10,JSON.stringify(todo.data))
  res.send(todo.data)


    }
    
    
  } catch (error) {
    res.send(error.message)
    
  }

})

module.exports=routes