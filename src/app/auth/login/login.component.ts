import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',

  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent {

  //Servicios
  formBuilder = inject(FormBuilder);

  //Atributos
  loginMode = output<boolean>();

  //Formularios

  fbLogin: FormGroup = this.formBuilder.group({
    "email":["",[Validators.required]],
    "contrasena":["",[Validators.required]]
  });


  fbRegister:FormGroup = this.formBuilder.group({});

  //Form de login
  onLogin() {

    console.log(this.fbLogin.value);

    //TODO: 1. Guarda el objeto en una variable 2. Crear interfaz de login

  }

  //Emitir valor de login
  loginModeEmit(){
    this.loginMode.emit(false);
  }

}
