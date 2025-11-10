import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentComponent } from "../../shared/modal-component/modal-component.component";
import { BuscadorComponent } from "../../shared/searcher/searcher.component";
import { NotificationsService } from '../../services/notifications.service';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';

@Component({
  selector: 'request',
  imports: [CommonModule, ModalComponentComponent, BuscadorComponent],
  templateUrl: './request.component.html',
})
export class RequestComponent {
  //Servicios
  notificacionsStatusService = inject(NotificacionsStatusService);
  notificationsService = inject(NotificationsService);


  acceptNotification(id:number){

    console.log(id);


    this.notificationsService.postRegisterNotification(id).subscribe(
      (status) => {
        if (status){
          this.notificationsService.registerNotificationResource.reload();
          this.notificacionsStatusService.showMessage();
        }
      }
    )
  }

}
