const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const TareaSchema= new Schema(
    {
        date:{type:String,required:true},
        name:{type:String,required:true},
        description:{type:String,required:true}
    },
    {timestamps:true}
)
const Tarea=mongoose.model("Tarea",TareaSchema);
module.exports = Tarea;
