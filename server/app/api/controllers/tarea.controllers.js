const Tarea=require('../models/tarea.model')
const User=require('../models/user.model')
const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");

const addTarea= async(req, res,next)=>{
    try {
        const userEmail=req.headers.email;
        const tarea = new Tarea()
        tarea.date=req.body.date;
        tarea.name=req.body.name;
        tarea.description=req.body.description;
        const tareaDB= await tarea.save()
        const user = await User.findOneAndUpdate({email:userEmail},{$addToSet:{tareas:tareaDB}})
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: { user: user }
        });
    } catch (error) {
        return next(error);
    }
}

const allTareas= async(req, res,next)=>{
    try {    
        const userEmail=req.headers.email;
        const tareas= await User.find({email:userEmail}).populate("tareas")
        console.log(tareas)
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: { tareas: tareas }
        });
    } catch (error) {
        return next(error);
    }
}
const getTarea= async(req, res,next)=>{
    try{
        const{id}=req.params
        const tarea= await Tarea.find({_id:id})
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[202],
            data: { tarea: tarea }
        })
    }catch(error){
        return next(error)
    }
}
const updateTarea= async(req, res,next)=>{
    try {
        const{id}=req.params
        const tarea=await Tarea.findOneAndUpdate({_id:id},{date:req.body.date,name:req.body.name,description:req.body.description})
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[202],
            data: { tarea: tarea }
        })
    } catch (error) {
        return next(error);
    }
}
const deleteTarea= async(req, res,next)=>{
    try {
        const {id}=req.params
        const tarea = await Tarea.findOneAndDelete({_id:id})
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[202],
            data: { tarea:tarea }
        })
    } catch (error) {
        return next(error);
    }
}


module.exports = { addTarea,allTareas,getTarea,updateTarea,deleteTarea };