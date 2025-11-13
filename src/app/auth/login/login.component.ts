import { Component, inject, OnDestroy, OnInit, output, signal } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { passwordValidator } from '../../utils/FormsValidations/authValidators';
import { Router } from '@angular/router';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',

  imports: [FormsModule, ReactiveFormsModule, StatusMessageComponent],
})
export class LoginComponent{

  //Servicios
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  notificacionsStatusService = inject(NotificacionsStatusService);
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
    if(this.fbLogin.invalid || this.authService.loginLoader()){
      this.fbLogin.reset();
      return;
    }
    this.authService.loginLoader.set(true);

    this.authService.loginUser(this.fbLogin.value)
    .subscribe((autenticacionCorrecta)=>{
      if(autenticacionCorrecta){
        this.router.navigateByUrl("/inicio");
        return;
      }
      this.notificacionsStatusService.showMessage();

    });
  }

  //Emitir valor de login para cambiar a register
  loginModeEmit(){
    this.loginMode.emit(false);
  }

}
