const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        title:{type:String},
        is_completed:{type:Boolean,default:false}
    }
)
const Tasks=mongoose.model('Task',schema)
module.exports=Tasks