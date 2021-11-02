import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Auth} from '../../models/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup
  registerForm:FormGroup
  constructor(private builder:FormBuilder,private api:AuthService,private router:Router) {
    this.loginForm=builder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    this.registerForm=builder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      repeatPassword:['',[Validators.required]]
    })
   }

  ngOnInit(): void {}
  login(){
    if(this.loginForm.valid){
      const user:Auth={
        email:this.loginForm.get('email')?.value,
        password:this.loginForm.get('password')?.value
      }
      this.api.login(user).subscribe((response:any)=>{
        console.log(response)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("user",response.data.user.name)
        localStorage.setItem("email",response.data.user.email)
        this.router.navigate(['home']);
      this.loginForm.reset();
      })
    }
  }

  register(){
    if(this.registerForm.valid){
      const user:Auth={
        name:this.registerForm.get('name')?.value,
        email:this.registerForm.get('email')?.value,
        password:this.registerForm.get('password')?.value
      }
      this.api.register(user).subscribe((response:any)=>{
        console.log(response)
        this.registerForm.reset();
      })
    }
  }

}
