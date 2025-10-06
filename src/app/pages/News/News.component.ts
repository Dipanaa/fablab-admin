import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, Renderer2, signal, ViewChild, effect } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { RouterLink } from '@angular/router';
import { ErrorComponent } from '../../shared/error-component/error-component.component';
import { DatePipe } from '@angular/common';
import { StatusMessageComponent } from "../../shared/status-message/status-message.component";
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';

@Component({
  selector: 'app-news',
  imports: [RouterLink, ErrorComponent, DatePipe, StatusMessageComponent],
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
  @ViewChild("icon-state-color") iconStateColor!: ElementRef;

  //Estado de noticias con colores
  newsState: object = {
    "Activo": "text-green-600",
    "Deshabilitado": "text-gray-600"
  };

  //Mensaje de estado para mensajes, se puede expandir logica a error
  statusMessage = computed(()=> (this.notificacionsStatusService.statusMessage())?true:false);

  //Effecto para aparicion de mensaje de estado
  statusEffect = effect(()=>{
    if(this.statusMessage()){
      this.notificacionsStatusService.showMessage();
      return;
    }
  });



  constructor(){
    this.newsService.getNews();
  }

  //Obtener Estado de la noticia
  getStateNew(estado: string){

    if(Object.hasOwn(this.newsState,estado)){
      return estado;
    }
    return "Estado Desconocido";
  }

  //Obtener Color de la noticia
  getColorNew(estado: string){
     if(Object.hasOwn(this.newsState,estado)){
      return this.newsState[estado as keyof typeof this.newsState];
    }
    return "text-yellow-600";
  }






}
