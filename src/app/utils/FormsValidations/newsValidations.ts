import { FormBuilder, FormGroup } from '@angular/forms';

export class NewsFormsValidations{

  static ValidateField(fieldName: string, FormBuilderNews:FormGroup){
    return (FormBuilderNews.controls[fieldName].errors && FormBuilderNews.controls[fieldName].touched)?
    FormBuilderNews.controls[fieldName].errors:
    null;
  }

  static ValidateErrors(fieldName: string, FormBuilderNews:FormGroup){

    if(!this.ValidateField(fieldName, FormBuilderNews)){
      console.log(fieldName);
      return null;
    }

    const errors = FormBuilderNews.controls[fieldName].errors ?? {};

    for(const key of Object.keys(errors)){

      switch(key){
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `El ${fieldName} debe contener un minimo de ${errors["minlength"].requiredLength} caracteres`;
        case 'min':
          return `Minimo de ${errors["min"].min}`
      }
    }

    return true;

  }

}



