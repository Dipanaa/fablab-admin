import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent {

  //TODO: Crear servicio auth
  formBuilder = inject(FormBuilder);

  //Formularios

  fbLogin: FormGroup = this.formBuilder.group({
    "email":["",[Validators.required]],
    "contrasena":["",[Validators.required]]
  });


  fbRegister:FormGroup = this.formBuilder.group({});






  isLoginView: boolean = true;

  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: '',
  };

  userLogin: any = {
    emailId: '',
    password: '',
  };

  router = inject(Router);

  onRegister() {
    const isLocalData = localStorage.getItem('localData');
    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem('localData', JSON.stringify(localArray));
    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem('localData', JSON.stringify(localArray));
    }
    alert('Registro exitoso');
  }

  onLogin() {
    console.log(this.fbLogin.value);

    //TODO: 1. Guarda el objeto en una variable 2. Crear interfaz de login



  }
}
