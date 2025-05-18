import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,LabelModule,InputsModule,ButtonsModule,TextBoxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm! : FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      ssoid: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  login() {
   const { ssoid, password } = this.loginForm.value;
  if(this.loginForm.valid){
    debugger;
    if(this.authService.login(ssoid,password))
      {
        debugger
        //this.showInvalidCredentials = true;
        localStorage.setItem('isLoggedIn','true');
        this.router.navigate(['/dashboard']);
        return true;
      }
      else
      {
        //this.showInvalidCredentials = false;
         return false;
      }
  }
  return false;
}
}
