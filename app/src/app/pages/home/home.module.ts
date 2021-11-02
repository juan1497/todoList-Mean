import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TareasComponent } from './components/tareas/tareas.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TareaService } from 'src/app/shared/services/tarea.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TareasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  providers:[AuthService,TareaService]
})
export class HomeModule { }
