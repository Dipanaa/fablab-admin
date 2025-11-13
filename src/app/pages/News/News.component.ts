import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NewsService } from '../../services/news.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-news',
  imports: [
    RouterLink,
    DatePipe,
    StatusMessageComponent,
    FooterComponent,
  ],
  templateUrl: './News.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  //Inyectar Servicios
  newsService = inject(NewsService);
  Renderer2 = inject(Renderer2);
  notificacionsStatusService = inject(NotificacionsStatusService);

  //Atributos

  //Inicializar campos
  @ViewChild('icon-state-color') iconStateColor!: ElementRef;

  //Estado de noticias con colores
  newsState: object = {
    Activo: 'text-green-600',
    Deshabilitado: 'text-gray-600',
  };

  //Mensaje de estado para mensajes, se puede expandir logica a error
  statusMessage = computed(()=> (this.notificacionsStatusService.statusMessage())?true:false);

  //Obtener Estado de la noticia
  getStateNew(estado: string) {
    if (Object.hasOwn(this.newsState, estado)) {
      return estado;
    }
    return 'Estado Desconocido';
  }

  //Obtener Color de la noticia
  getColorNew(estado: string) {
    if (Object.hasOwn(this.newsState, estado)) {
      return this.newsState[estado as keyof typeof this.newsState];
    }
    return 'text-yellow-600';
  }
}
