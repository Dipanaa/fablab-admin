import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn{

  return (control:AbstractControl): ValidationErrors | null => {

    const controlValue = (control.value != null)? control.value.toString():null;

    if(controlValue == "" || controlValue == null){
      return null;
    }

    if(controlValue.match(/[A-Z]/g) && controlValue.match(/[!"#$%&@*]/g)){
      return null;
    }

    return {passwordRegister:{controlValue: controlValue}};
  }


}
