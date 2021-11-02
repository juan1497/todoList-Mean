const express = require('express');
const router = express.Router();
const {addTarea,allTareas,getTarea,updateTarea,deleteTarea }=require('../controllers/tarea.controllers')
const { isAuth } = require("../../../middlewares/auth.middleware");


router.post('/add-tarea',addTarea);
router.get("/tareas",allTareas)
router.get("/tarea/:id",getTarea)

router.put("/update-tarea/:id",updateTarea)
router.delete("/delete-tarea/:id",deleteTarea)

module.exports = router;