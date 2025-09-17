import { Component, output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  //Servicios
  formBuilder = inject(FormBuilder);

  //Atributos
  registerMode = output<boolean>();

  fbRegister:FormGroup = this.formBuilder.group({
    email:["",[Validators.required,Validators.pattern(/.+@inacapmail\.cl$/)]],
    nombre:["",[Validators.required,Validators.minLength(5)]],
    apellido:["",[Validators.required,Validators.minLength(5)]],
    rut:["",[Validators.required,Validators.pattern(/\b[0-9|.]{1,10}\-[K|k|0-9]/gmi)]],
    carrera:["",[Validators.required]],
    telefono:["",[Validators.required,Validators.minLength(9)]],
    contrasena:["",[Validators.required]] //TODO: Agregar validacion de contraseña con mayusculua y caracteres especiales
  });

   //Emitir valor de register
  registerModeEmit(){
    this.registerMode.emit(true);
  }

  registerUser(){
    if(this.fbRegister.invalid){
      console.log(this.fbRegister.controls["rut"].errors);
      return;
    }
    console.log(this.fbRegister.value);
  }




}
