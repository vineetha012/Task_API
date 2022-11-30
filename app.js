const express=require('express')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const db=require('./connection/taskconnection')
const taskmodel=require('./model/taskmodel')

app.set("views", "./views")//html templates
app.set("view engine", "ejs")//compiler when dynamic pages
app.use(express.static("public"))
// app.get("/",(req,res)=>{
//     res.send("server is ok")
// })
app.post("/tasks",async(req,res)=>{
 
    try {
        const title=req.body.title
        console.log(title)
        const task=await taskmodel.create({
            title:title,
          
        })
       
        res.status(201).json(task)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
app.get("/tasks",async(req,res)=>{
    try {
        const tasks=await taskmodel.find()
        console.log(tasks);
        res.status(201).json(tasks)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
//-----------------
app.get('/task/:id',async(req,res)=>{
    
    // console.log(req.params)
    // res.send("ok")
    const {id}=req.params
    try {
         const task=await  taskmodel.findById(id)
        console.log(id);
        res.status(200).json(task)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})
app.put('/task/:id',async(req,res)=>{
    const {id}=req.params
    const {title}=req.body
    try {
        const task=await taskmodel.findByIdAndUpdate(id)
        res.status(201).json(task)
    } catch (error) {
        res.send(error)
    }
})
app.delete('/task/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const task=await taskmodel.findByIdAndDelete(id)
        //const alltask=await postModel.find()
        res.json("deleted")
    } catch (error) {
        res.send(error)
    }
})
//-----------POST /v1/tasks

app.get('/:arr',async(req,res)=>{
    try {
        const arr=req.body.tasks
        arr.map(async(task,index)=>{
            await taskmodel.create({
                title:task.title

            })
        })
        const app=await taskmodel.find()
        res.json()
    } catch (error) {
        res.send(error)
    }
})

app.listen(3001,()=>console.log("server runnung at port 3001"))