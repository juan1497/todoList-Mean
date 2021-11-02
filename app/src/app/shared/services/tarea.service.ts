import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TareaService {
  urlBase="https://todo-list-juan1497.vercel.app/tarea/"
  constructor(private http:HttpClient) { }
  addTarea(data:any){
    return this.http.post(this.urlBase+"add-tarea",data)
  }
  getTareas(){
    return this.http.get(this.urlBase+"tareas")
  }
  getTarea(id:any){
    return this.http.get(this.urlBase+`tarea/${id}`)
  }
  updateTarea(data:any){ 
    return this.http.put(this.urlBase+`update-tarea/${data._id}`,data)
  }
  deleteTarea(data:any){
    return this.http.delete(this.urlBase+`delete-tarea/${data}`)
  }


}
