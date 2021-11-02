import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/pages/user/models/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TareaService } from 'src/app/shared/services/tarea.service';
import { Tarea } from './models/tarea';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  user:any
  tareas:Tarea[]=[]
  
  tareaForm:FormGroup;
  updateForm:FormGroup
  constructor(private apiAuth:AuthService,private api:TareaService,private router:Router,private builder:FormBuilder) { 
    this.tareaForm=builder.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      date:['',[Validators.required]]
    })
    this.updateForm= new FormGroup({
      id: new FormControl,
      name:new FormControl,
      description: new FormControl,
      date:new FormControl
    
    })
  }

  ngOnInit(): void {
    this.user=localStorage.getItem("user")
    this.getTareas()
  }
  logout(data:any){
    this.apiAuth.logout(data).subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      this.router.navigate(['login'])
    })
  }
  getTareas(){
    this.api.getTareas().subscribe((response:any)=>{
      console.log(response)
      this.tareas=response.data.tareas[0].tareas
    })
  }
  addTarea(){
    if(this.tareaForm.valid){
      const tarea:Tarea={
        date:this.tareaForm.get('date')?.value,
        name:this.tareaForm.get('name')?.value,
        description:this.tareaForm.get('description')?.value
      }
      this.api.addTarea(tarea).subscribe((response:any)=>{
        console.log(response)
        this.getTareas()
      })
      this.tareaForm.reset()
    }
  }
  deleteTarea(id:any){
    this.api.deleteTarea(id).subscribe((response:any)=>{
      console.log(response)
      this.getTareas()
    })

  }
  getTarea(id:any){
    this.api.getTarea(id).subscribe((response:any)=>{
      const tarea:Tarea=response.data.tarea[0];
      this.updateForm=this.builder.group({
        id:[tarea._id,[Validators.required]],
        name:[tarea.name,[Validators.required]],
        description:[tarea.description,[Validators.required]],
        date:[tarea.date,[Validators.required]]
      })
    })
  }

  update(){
    if(this.updateForm.valid){
      const tarea:Tarea={
        _id:this.updateForm.get('id')?.value,
        name:this.updateForm.get('name')?.value,
        description:this.updateForm.get('description')?.value,
        date:this.updateForm.get('date')?.value
      }
      this.api.updateTarea(tarea).subscribe((response:any)=>{
        console.log(response)
        this.getTareas()
        this.updateForm.reset()
      })
    }
  }
}
