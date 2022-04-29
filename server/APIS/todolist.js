const exp=require('express')
const todoApp=exp.Router()
const ObjectId=require('mongodb').ObjectId

//to handle errors of asynchronous req
const expressAsyncHandler=require('express-async-handler')

todoApp.use(exp.json())
//to create todo
todoApp.post('/create-todo',expressAsyncHandler(async (req,res)=>
{
    const todoListobj=req.app.get("todoListobj")
	let ne_td=req.body
	
	let result=await todoListobj.insertOne(ne_td)
	res.send({message:"todo inserted successfully"})
}))
//to get all todos
todoApp.get('/get-todos',expressAsyncHandler(async (req,res)=>
{
	const todoListobj=req.app.get('todoListobj')
	let todos=await todoListobj.find().toArray()
	
	res.send({message:"list of all todos",payload:todos})
}))
//to update todo
todoApp.put('/update-todo/:id',expressAsyncHandler(async (req,res)=>
{
	const todoListobj=req.app.get('todoListobj')
	let up_td=req.body
	let g_id=req.params.id
	
	//let up_id=req.params.id
	await todoListobj.updateOne({_id:new ObjectId(g_id)},{$set:{...up_td}})
	res.send({message:"todo updated successfully"})
}))


todoApp.delete('/delete-todo/:id',expressAsyncHandler(async (req,res)=>
{
  let todoListobj=req.app.get('todoListobj')
  let g_id=req.params.id
 
  await todoListobj.deleteOne({_id:new ObjectId(g_id)})
  res.send({message:"todo has beeen deleted"})
}))





module.exports=todoApp