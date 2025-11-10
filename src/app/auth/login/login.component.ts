import { Component, inject, OnDestroy, OnInit, output, signal } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { passwordValidator } from '../../utils/FormsValidations/authValidators';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',

  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent{

  //Servicios
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  //Atributos
  loginMode = output<boolean>();

  //Formularios
  fbLogin: FormGroup = this.formBuilder.group({
    "email":["",[Validators.required]],
    "contrasena":["",[Validators.required,Validators.minLength(5),passwordValidator()]]
  });

  //Form de login
  loginUser() {
    if(this.fbLogin.invalid){
      this.fbLogin.reset();
      return;
    }
    this.authService.loginUser(this.fbLogin.value)
    .subscribe((autenticacionCorrecta)=>{
      if(autenticacionCorrecta){
        this.router.navigateByUrl("/inicio");
        return;
      }

    });
  }

  //Emitir valor de login para cambiar a register
  loginModeEmit(){
    this.loginMode.emit(false);
  }

}
