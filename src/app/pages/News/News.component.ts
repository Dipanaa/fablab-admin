import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, signal, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { RouterLink } from '@angular/router';
import { ErrorComponent } from '../../shared/error-component/error-component.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [RouterLink,ErrorComponent,DatePipe],
  templateUrl: './News.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {

  //Inyectar Servicios
  newsService = inject(NewsService);
  Renderer2 = inject(Renderer2);

  //Inicializar campos
  @ViewChild("icon-state-color") iconStateColor!: ElementRef;

  //Estado noticias con colores
  newsState: object = {
    "Activo": "text-green-600",
    "Deshabilitado": "text-gray-600"
  };

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
