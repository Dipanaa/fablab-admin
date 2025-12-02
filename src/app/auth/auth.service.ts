import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Injector, OnInit, signal } from '@angular/core';
import { TokenJwt } from '../utils/responses-interfaces/authResponses/tokenJwt.interface';
import { Observable, tap, map, catchError, of, finalize, delay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { UsersInterface } from '../interfaces/users.interface';
import { UsersAuthApitoUser } from '../utils/mappers/usersMapper';
import { environment } from '../../environments/environments';
import { NotificacionsStatusService } from '../services/notificacionsStatus.service';
import { CleanSessionService } from './cleanSession.service';

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
          this.userData.set(UsersAuthApitoUser(resp.usuario));
          this.jwtToken.set(resp);
          this._autentication.set(true);
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => {
           this._notificationStatusService.statusMessage.set(true);
          this._notificationStatusService.statusErrorMessage.set("Error al ingresar email y/o contraseña");
          return of(false);
        })
      );
  }

  //Postear usuarios
  registerUser(formRegister: any): Observable<boolean> {
    return this._httpClient.post(`${this.baseUrl}/registro`, formRegister).pipe(
      map(() => {
        this._notificationStatusService.statusMessage.set(true);
        this._notificationStatusService.statusTextMessage.set("Formulario de registro completado con exito!");
        return true;
      }),
      finalize(() => {

        this.registerLoader.set(false);
      }),
      catchError((err) => {
        this._notificationStatusService.statusMessage.set(true);
        this._notificationStatusService.statusErrorMessage.set(err.error.errors.error);
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
