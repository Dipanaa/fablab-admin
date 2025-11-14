import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { TokenJwt } from '../utils/responses-interfaces/authResponses/tokenJwt.interface';
import { UserResponseAuth } from '../utils/responses-interfaces/authResponses/userResponseAuth.interface';
import { Observable, tap, map, catchError, of, finalize, delay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { UsersInterface } from '../interfaces/users.interface';
import { UsersAuthApitoUser } from '../utils/mappers/usersMapper';
import { tokenGetter } from '../app.config';
import { NotificacionsStatusService } from '../services/notificacionsStatus.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //Servicios
  private _httpClient = inject(HttpClient);
  private _notificationStatusService = inject(NotificacionsStatusService);

  //Atributos
  private _jwtToken = signal< TokenJwt | null >(null);
  tokenJWT = signal<string | null>(localStorage.getItem('token'))
  private _autentication = signal<boolean>(false);
  userData = signal<UsersInterface | null>(null);
  registerLoader = signal<boolean>(false);
  loginLoader = signal<boolean>(false);

  //Getter de autenticacion
  Autentication = computed(() => {
    if (this._autentication()) {
      return true;
    }
    return false;
  });

  //Verificar token de autenticacion en localstorage
  checkTokenStatus = rxResource({
    loader: () => {
      return this.checkStatus();
    },
  });

  //Logear usuarios
  loginUser(formLogin: any): Observable<boolean>{
    return this._httpClient.post<TokenJwt>("http://localhost:5263/api/autenticacion/usuarios/login",formLogin,)
    .pipe(
      tap((resp)=> {
        this.userData.set(UsersAuthApitoUser(resp.usuario));
        this._jwtToken.set(resp);
        this.tokenJWT.set(resp.token);
        this._autentication.set(true);
        localStorage.setItem("token",resp.token);
      }),
      map(() => {
        return true;
      }),
      finalize(() => {
        this.loginLoader.set(false);
      }),
      catchError((error)=>{
        this._notificationStatusService.statusMessage.set(true);
        this._notificationStatusService.statusErrorMessage.set("Hubo un error al ingresar su correo y/o contraseña");
        return of(false);
      })
    );
  }

  //Postear usuarios
  registerUser(formRegister: any): Observable<boolean> {
    return this._httpClient
      .post(
        'http://localhost:5263/api/autenticacion/usuarios/registro',
        formRegister
      )
      .pipe(
        map(() =>{
          this._notificationStatusService.statusMessage.set(true);
          this._notificationStatusService.statusTextMessage.set("Solicitud de ingreso enviada correctamente a la espera de aprobación");
          return true;

        }),
        finalize(() => {
          this.registerLoader.set(false);
        }),
        catchError((err) => {
          this._notificationStatusService.statusMessage.set(true);
          this._notificationStatusService.statusErrorMessage.set("Hubo un error en la solicitud ingresada");
          return of(false);
        })
      );
  }

  //Renovar token
  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token){
      return of(false);
    }

    return this._httpClient.get<TokenJwt>("http://localhost:5263/api/autenticacion/usuarios/check-status").pipe(
      tap((resp)=> {
        this.userData.set(UsersAuthApitoUser(resp.usuario));
        this._jwtToken.set(resp);
        this.tokenJWT.set(resp.token);
        this._autentication.set(true);
        localStorage.setItem("token",resp.token);
      }),
      map((resp)=> true),
      catchError((error)=>{
        return of(false);
      })
    )
  }

  //Cerrar sesion
  closeSesion(): void {
    this._jwtToken.set(null);
    this._autentication.set(false);
    this.userData.set(null);
    localStorage.removeItem('token');
  }
}
