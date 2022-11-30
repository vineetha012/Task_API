const mongoose=require("mongoose")
require("dotenv").config();

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
//console.log(process.env.MONGO_PASSWORD)
const uri=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@vineetha-cluster.inwcmoa.mongodb.net/tasks?retryWrites=true&w=majority`
const mongoconnection=mongoose.connect(uri,connectionParams).then(()=>console.log("connected to mongoose atlas"))
.catch((err)=>console.log(err))

module.exports=mongoconnection