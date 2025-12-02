import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentComponent } from "../../shared/modal-component/modal-component.component";
import { BuscadorComponent } from "../../shared/searcher/searcher.component";
import { NotificationsService } from '../../services/notifications.service';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';

@Component({
  selector: 'request',
  imports: [CommonModule, BuscadorComponent, StatusMessageComponent],
  templateUrl: './request.component.html',
})
export class RequestComponent{
  //TODO: Falta una tabla de loading
  //Servicios
  notificacionsStatusService = inject(NotificacionsStatusService);
  notificationsService = inject(NotificationsService);

  //Atributos
  isOpenModalView = signal<boolean>(false);
  notificationId = signal<number | null>(null);

  notificationsActive = computed(()=>{
    if(this.notificationsService.registerNotificationResource.hasValue()){
      return this.notificationsService.notificationsData();
    }
    return;
  })



  acceptNotification(id:number){
    if(!id){
      return;
    }
    this.notificationsService.postRegisterNotification(id).subscribe(
      (status) => {
        if (status){
          this.notificationsService.registerNotificationResource.reload();
          this.notificacionsStatusService.showMessage();
          return;
        }
        this.notificationsService.registerNotificationResource.reload();
        this.notificacionsStatusService.showMessage();
      }
    )
  }

  deleteNotification(id:number){
    if(!id){
      return;
    }
    this.notificationsService.deleteRegisterNotification(id).subscribe(
      (status) => {
        if (status){
          this.notificationsService.registerNotificationResource.reload();
          this.notificacionsStatusService.showMessage();
          return;
        }
        this.notificacionsStatusService.showMessage();
      }
    )
  }



}
