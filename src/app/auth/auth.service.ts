import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { TokenJwt } from '../interfaces/authResponses/tokenJwt.interface';
import { UserResponseAuth } from '../interfaces/authResponses/userResponseAuth.interface';
import { Observable, tap, map, catchError, of, finalize, delay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';



@Injectable({providedIn: 'root'})
export class AuthService{


  //Servicios
  private _httpClient = inject(HttpClient);

  //Atributos
  private _jwtToken = signal< TokenJwt | null >(null);
  private _autentication = signal<boolean>(false);
  userData = signal<UserResponseAuth | null>(null);
  registerLoader = signal<boolean>(false);

  //Getter de autenticacion
  Autentication = computed(()=>{
    if (this._autentication()){
      return true;
    }
    return false;
  })

  //Verificar token de autenticacion en localstorage
  checkTokenStatus = rxResource({
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
        this._autentication.set(true);
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
  registerUser(formRegister: any): Observable<boolean>{
    return this._httpClient.post("http://localhost:5263/api/autenticacion/usuarios/registro",formRegister)
    .pipe(
      delay(4000),
      map(()=> true),
      finalize(()=>{
        this.registerLoader.set(false);
        console.log("Estado carga registro finalizado");
      }),
      catchError((err)=> {
        console.log(err);
        return of(false)})
    )

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
        this._autentication.set(true);
        localStorage.setItem("token",resp.token);
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
    this._autentication.set(false);
    this.userData.set(null);
    localStorage.removeItem("token");
  }

}
