import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

  //Servicios
  private httpClient = inject(HttpClient);


  //Postear usuarios
  registerUser(formRegister: any): void{

    this.httpClient.post("http://localhost:5263/api/autenticacion/usuarios/registro",formRegister)
    .subscribe({
      next: () => {
        console.log("El usuario fue registardo con exito");
      },
      error: (err) => {
        console.log("Hubo un error al ingresar al usuario",err);
      },
      complete: () => {
        console.log("Se completo la peticion post");
      }
    })

  }







}
