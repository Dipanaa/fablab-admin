import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Injector, OnInit, signal } from '@angular/core';
import { TokenJwt } from '../utils/responses-interfaces/authResponses/tokenJwt.interface';
import { UserResponseAuth } from '../utils/responses-interfaces/authResponses/userResponseAuth.interface';
import { Observable, tap, map, catchError, of, finalize, delay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { UsersInterface } from '../interfaces/users.interface';
import { UsersAuthApitoUser } from '../utils/mappers/usersMapper';
import { tokenGetter } from '../app.config';


import { environment } from '../../environments/environments';
import { NotificacionsStatusService } from '../services/notificacionsStatus.service';
import { CleanSessionService } from './cleanSession.service';
import { ProjectsService } from '../services/projects.service';



@Injectable({ providedIn: 'root' })
export class AuthService {
  //Servicios
  private _httpClient = inject(HttpClient);
  private _notificationStatusService = inject(NotificacionsStatusService);
  private injectorCleanSession = inject(Injector);

  //Atributos
  jwtToken = signal< TokenJwt | null >(null);
  private _autentication = signal<boolean>(false);
  userData = signal<UsersInterface | null>(null);
  registerLoader = signal<boolean>(false);
  loginLoader = signal<boolean>(false);

  private baseUrl = `${environment.apiKey}/api/autenticacion/usuarios`;

  constructor() {
    console.log(this.baseUrl);
  }

  //Getter de autenticacion
  Autentication = computed(() => {
    if (this._autentication()) {
      return true;
    }
    return false;
  });

  //Getter de token
  tokenJWT = computed(()=>{
    if(!this.jwtToken()?.token){
      return localStorage.getItem('token');
    }
    return this.jwtToken()?.token;
  })



  //Verificar token de autenticacion en localstorage
  checkTokenStatus = rxResource({
    loader: () => {
      return this.checkStatus();
    },
  });

  //Logear usuarios
  loginUser(formLogin: any): Observable<boolean> {
    return this._httpClient
      .post<TokenJwt>(`${this.baseUrl}/login`, formLogin)
      .pipe(
        tap((resp) => {
          console.log(resp);
          this.userData.set(UsersAuthApitoUser(resp.usuario));
          this.jwtToken.set(resp);
          this._autentication.set(true);
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  //Postear usuarios
  registerUser(formRegister: any): Observable<boolean> {
    return this._httpClient.post(`http://localhost:5263/api/autenticacion/usuarios/registro`, formRegister).pipe(
      delay(4000),
      map(() => true),
      finalize(() => {
        this._notificationStatusService.statusMessage.set(true);
        this._notificationStatusService.statusTextMessage.set("Formulario de registro completado con exito!");
        this.registerLoader.set(false);
      }),
      catchError((err) => {
        this._notificationStatusService.statusMessage.set(true);
        this._notificationStatusService.statusErrorMessage.set("Error al ingresar el formulario");
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

    return this._httpClient.get<TokenJwt>(`${this.baseUrl}/check-status`).pipe(
      tap((resp) => {
        this.userData.set(UsersAuthApitoUser(resp.usuario));
        this.jwtToken.set(resp);
        this._autentication.set(true);
        localStorage.setItem('token', resp.token);
      }),
      map((resp) => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  //TODO: Implementar
  cleanSessionInjector(){
    return this.injectorCleanSession.get(CleanSessionService);
  }



  //Cerrar sesion
  closeSesion(): void {
    this.jwtToken.set(null);
    this._autentication.set(false);
    this.userData.set(null);
    localStorage.removeItem('token');
    window.location.reload();

  }
}
