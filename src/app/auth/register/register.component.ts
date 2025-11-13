import { Component, output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from '../../utils/FormsValidations/authValidators';
import { AuthService } from '../auth.service';
import { CustomFormsValidations } from '../../utils/FormsValidations/CustomValidations';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';


@Component({
  selector: 'register',
  imports: [FormsModule, ReactiveFormsModule,StatusMessageComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  //Servicios
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  notificacionsStatusService = inject(NotificacionsStatusService);
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  registerMode = output<boolean>();

  fbRegister:FormGroup = this.formBuilder.group({
    email:["",[Validators.required,Validators.pattern(/.+@inacapmail\.cl$/g)]],
    nombre:["",[Validators.required,Validators.minLength(5)]],
    apellido:["",[Validators.required,Validators.minLength(5)]],
    rut:["",[Validators.required,Validators.pattern(/\b[0-9|.]{1,10}\-[K|k|0-9]/gmi)]],
    carrera:["",[Validators.required]],
    telefono:["",[Validators.required,Validators.minLength(9)]],
    contrasena:["",[Validators.required,Validators.minLength(5),passwordValidator()]]
  });

   //Emitir valor de register
  registerModeEmit(){
    this.registerMode.emit(true);
  }

  //Post de registro
  registerUser(){
    if(this.fbRegister.invalid || this.authService.registerLoader()){
      this.fbRegister.markAllAsTouched();
      return;
    }
    this.authService.registerLoader.set(true);

    //Uso de logica message status con delay de 5s
    this.authService.registerUser(this.fbRegister.value)
    .subscribe((status)=>{
      if(status){
        this.fbRegister.reset();
        this.notificacionsStatusService.showMessage();
        return;
      }
      this.notificacionsStatusService.showMessage();
    });
  }

}
