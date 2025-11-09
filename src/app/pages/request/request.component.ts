import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentComponent } from "../../shared/modal-component/modal-component.component";
import { BuscadorComponent } from "../../shared/searcher/searcher.component";
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'request',
  imports: [CommonModule, ModalComponentComponent, BuscadorComponent],
  templateUrl: './request.component.html',
})
export class RequestComponent {
onBuscador($event: Event) {
throw new Error('Method not implemented.');
}

  //Servicios
  notificationsService = inject(NotificationsService);

}
