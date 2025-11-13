import { FormGroup } from '@angular/forms';

export class CustomFormsValidations{

  static ValidateField(fieldName: string, FormBuilder:FormGroup){
    return (FormBuilder.controls[fieldName].errors && FormBuilder.controls[fieldName].touched)?
    FormBuilder.controls[fieldName].errors:
    null;
  }

  static ValidateErrors(fieldName: string, FormBuilder:FormGroup,optionalName?: string){

    //Nombre del campo a usar
    const fieldNameToUse = (optionalName)? optionalName: fieldName;


    if(!this.ValidateField(fieldName, FormBuilder)){

      return null;
    }

    const errors = FormBuilder.controls[fieldName].errors ?? {};

    for(const key of Object.keys(errors)){

      switch(key){
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `El ${fieldNameToUse} debe contener un minimo de ${errors["minlength"].requiredLength} caracteres`;
        case 'maxlength':
          return `El ${fieldNameToUse} debe contener un maximo de ${errors["maxlength"].requiredLength} caracteres`;
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



