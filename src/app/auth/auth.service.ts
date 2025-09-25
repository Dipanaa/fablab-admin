import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { TokenJwt } from '../interfaces/authResponses/tokenJwt.interface';
import { UserResponseAuth } from '../interfaces/authResponses/userResponseAuth.interface';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';



@Injectable({providedIn: 'root'})
export class AuthService{


//TODO:Estado de authenticacion (verificar)
  //Servicios
  private _httpClient = inject(HttpClient);
  private _jwtToken = signal< TokenJwt | null >(null);
  private _autenticacion = signal<boolean>(false);
  userData = signal<UserResponseAuth | null>(null);

  //Getter de autenticacion
  Autenticacion = computed(()=>{
    if (this._autenticacion()){
      return true;
    }
    return false;
  })

  //Verificar token de autenticacion en localstorage

  revisarEstadoToken = rxResource({
    loader: () => {
      return this.checkStatus();
    }
  });

  //Logear usuarios
  loginUser(formLogin: any): Observable<boolean>{
    return this._httpClient.post<TokenJwt>("http://localhost:5263/api/autenticacion/usuarios/login",formLogin)
    .pipe(
      tap((resp)=> {
        this.userData.set(resp.usuario);
        this._jwtToken.set(resp);
        this._autenticacion.set(true);
        localStorage.setItem("token",resp.token);
      }),
      map((resp)=> true),
      catchError((error)=>{
        console.log(error);
        return of(false);
      })
    );
  }

  //Postear usuarios
  registerUser(formRegister: any): void{
    this._httpClient.post("http://localhost:5263/api/autenticacion/usuarios/registro",formRegister)
    .subscribe({
      next: () => {
        console.log("El usuario fue registrado con exito",);
      },
      error: (err) => {
        console.log("Hubo un error al ingresar al usuario",err);
      },
      complete: () => {
        console.log("Se completo la peticion post register");
      }
    })
  }

  //Renovar token
  checkStatus(): Observable<boolean>{

    const token = localStorage.getItem("token");

    if (!token){
      return of(false);
    }

    //TODO: Modificar con interceptores el encabezado
    return this._httpClient.get<TokenJwt>("http://localhost:5263/api/autenticacion/usuarios/check-status",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap((resp)=> {
        this.userData.set(resp.usuario);
        this._jwtToken.set(resp);
        this._autenticacion.set(true);
        localStorage.setItem("token",resp.token);

        console.log("token renovado");
        console.log("Verificar estado de token",this._autenticacion());
      }),
      map((resp)=> true),
      catchError((error)=>{
        console.log(error);
        return of(false);
      })
    )
  }

  //Cerrar sesion
  closeSesion(): void {
    this._jwtToken.set(null);
    this._autenticacion.set(false);
    this.userData.set(null);
    localStorage.removeItem("token");
  }

}
