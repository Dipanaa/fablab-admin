import { NotificationInterface } from './../../interfaces/notification.interface';
import { NotificationResponse } from "../responses-interfaces/notificationResponse";

export function notificationApiToNotification(responseDataNotification: NotificationResponse): NotificationInterface{

  return {
    id: responseDataNotification.id,
    nombre: `${responseDataNotification.nombre} ${responseDataNotification.apellido}`,
    email: responseDataNotification.email,
    tipo: responseDataNotification.tipo,
    rut: responseDataNotification.rut,
    fecha: responseDataNotification.fecha,
    estado: "Pendiente"
  }

}

//Este mapea a array
export function notificationsApiToNotificationsArray(responseDataNotification: NotificationResponse[]):NotificationInterface[]{
  return responseDataNotification.map((notificationResponseObj) => notificationApiToNotification(notificationResponseObj));
}


