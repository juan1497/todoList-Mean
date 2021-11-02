import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path:'login',loadChildren:()=>import('../app/pages/user/user.module').then(m=>m.UserModule)
  },
  {
    path:'home',loadChildren:()=>import('../app/pages/home/home.module').then(m=>m.HomeModule),
    canActivate:[AuthGuard]
  },
  {
    path:'**',redirectTo:'login',pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
