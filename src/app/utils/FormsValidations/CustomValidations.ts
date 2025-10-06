import { FormGroup } from '@angular/forms';

export class CustomFormsValidations{

  static ValidateField(fieldName: string, FormBuilder:FormGroup){
    return (FormBuilder.controls[fieldName].errors && FormBuilder.controls[fieldName].touched)?
    FormBuilder.controls[fieldName].errors:
    null;
  }

  static ValidateErrors(fieldName: string, FormBuilder:FormGroup){

    if(!this.ValidateField(fieldName, FormBuilder)){

      return null;
    }

    const errors = FormBuilder.controls[fieldName].errors ?? {};

    for(const key of Object.keys(errors)){

      switch(key){
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `El ${fieldName} debe contener un minimo de ${errors["minlength"].requiredLength} caracteres`;
        case 'min':
          return `Minimo de ${errors["min"].min}`
        case 'passwordRegister':
          return `La contraseña debe contener un caracter especial y una letra capitalizada`
        //TODO: Ingresar control correcto de error en email
        case 'pattern':
          return 'El campo no cumple con las condiciones'
      }
    }

    return true;

  }

}



