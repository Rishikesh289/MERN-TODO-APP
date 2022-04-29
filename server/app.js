const express=require('express')
const app=express()
const cors=require('cors')
const mclient=require('mongodb').MongoClient

app.use(cors())
const Dburl="mongodb+srv://vmeg2022:vmeg2022@cluster0.xa1my.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mclient.connect(Dburl).then((client)=>
{
    //get db obj
    const dbObj=client.db("todo")
    //get coll obj
    const todoListobj=dbObj.collection("todoList")
    

    //sharing collectn objs to apis
    app.set("todoListobj",todoListobj)
   
    console.log("db connection is successful")
})
.catch(err=>console.log("error in db connetion",err))


const todoApp=require('./APIS/todolist')

app.use('/todolist',todoApp)

//to handle invalid path
app.use((req,res,next)=>
{
	res.send({message:`invalid ${req.url} path`});
})

//to handle errors
app.use((error,req,res,next)=>
{
    //res.send({message:"syntax error"})
    res.send({message:"error occured",reason:`${error.message}}`})
})
app.listen(8000,()=>console.log("server listens to port 8000..."))