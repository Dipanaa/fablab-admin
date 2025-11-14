import { inject, Injectable, signal } from '@angular/core';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { NotificationInterface } from '../interfaces/notification.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { notificationsApiToNotificationsArray } from '../utils/mappers/notificationsMapper';
import { NotificationResponse } from '../utils/responses-interfaces/notificationResponse';

@Injectable({providedIn: 'root'})
export class NotificationsService {

  //Servicios
  httpClient = inject(HttpClient);
  notificationStatusService = inject(NotificacionsStatusService);

  //Atributos
  notificationsData = signal<NotificationInterface[]>([]);

  //Recursos reactivos

  //WARNING: Al implementar un segundo get de notificaciones se debe cambiar logica por CONDICION DE CARRERA

  //RxResource de formularios de ingreso

  registerNotificationResource = rxResource({
    loader: () => {
      return this.getRegisterNotifications();
    }
  });

  //Metodos
  //Notificaciones de ingreso
  getRegisterNotifications(): Observable<boolean>{
    return this.httpClient.get<NotificationResponse[]>(`http://localhost:5263/api/notificaciones/ingreso`)
    .pipe(
      map((dataNotifications)=> {
        this.notificationsData.set(notificationsApiToNotificationsArray(dataNotifications));
        return true;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusErrorMessage.set(err.error.detail);
        return of(false);
      })
    );
  }

  postRegisterNotification(id:number): Observable<boolean>{
    return this.httpClient.post(`http://localhost:5263/api/notificaciones/ingreso/${id}`,{})
    .pipe(
      map(()=> {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusTextMessage.set("Usuario añadido correctamente");
        return true;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusErrorMessage.set("Hubo un error al aceptar la solicitud");
        return of(false);
      })
    );

  }

  deleteRegisterNotification(id:number): Observable<boolean>{
    return this.httpClient.delete<NotificationResponse[]>(`http://localhost:5263/api/notificaciones/ingreso/${id}`)
    .pipe(
      map((dataNotifications)=> {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusTextMessage.set("Notificacion eliminada correctamente");
        return true;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusErrorMessage.set("Hubo un error al aceptar la solicitud");
        return of(false);
      })
    );

  }


}

