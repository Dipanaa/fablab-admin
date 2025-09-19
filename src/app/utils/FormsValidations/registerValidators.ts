import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function passwordRegisterValidator(): ValidatorFn{

  return (control:AbstractControl): ValidationErrors | null => {

    const controlValue = control.value.toString();
    if (controlValue === null || controlValue === '') {
      return null;
    }

    if(controlValue.match(/[A-Z]/g) && controlValue.match(/[!"#$%&@*]/g)){
      return null;
    }

    return {passwordRegister:{controlValue: controlValue}};
  }


}
