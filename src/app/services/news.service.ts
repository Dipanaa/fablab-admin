import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { News } from '../interfaces/news.interface';
import { catchError, finalize, map, Observable, of, pipe, tap } from 'rxjs';
import { NotificacionsStatusService } from './notificacionsStatus.service';


@Injectable({providedIn: 'root'})
export class NewsService {

  //Servicios
  private httpclient = inject(HttpClient);
  private notificacionsService = inject(NotificacionsStatusService);

  //News data
  newsResponse = signal<News[]>([]);

  //Carga de noticias señal
  newsLoading = signal<boolean>(false);
  errorHandler = signal<string | undefined>(undefined);


  //Obtencion de noticias al inyectar servicios
  constructor() {
    this.getNews();
  }

  //Metodo get news suscrito
  getNews(): void{
     if(this.newsLoading()){
      return;
    }
    this.newsLoading.set(true);

    this.httpclient.get<News[]>("http://localhost:5263/api/noticias").pipe(
      finalize(()=>{
        this.newsLoading.set(false);
      })
    )
    .subscribe({
      next: (resp) => {
        this.newsResponse.set(resp);
        console.log(resp);
        this.errorHandler.set(undefined);
      },
      error: (error) => {
        this.errorHandler.set(error.statusText);
        console.log(error);
      }
    }
    );
  }

  //Metodo get news para rxResource
  getNewsRxResource(): Observable<News[]>{
    return this.httpclient.get<News[]>("http://localhost:5263/api/noticias")
    .pipe(
      tap((resp)=> this.newsResponse.set(resp))
    );
  }

  //Creacion de noticia
  //TODO: Conversar si transformar a observable boolean
  postNew(news: News): Observable<boolean>{

    if(this.newsLoading()){
      return of(false);
    }
    //Cargando
    this.newsLoading.set(true);

    return this.httpclient.post("http://localhost:5263/api/noticias",news).pipe(
      map(()=> {
        this.notificacionsService.statusMessage.set(true);
        this.notificacionsService.statusTextMessage.set("Estado de noticia actualizado");
        return true;
      }),
      finalize(()=> this.newsLoading.set(false)),
      catchError(()=> of(false))
    )

  }

  //Eliminacion de noticias
  //TODO: Vincular a componente
  deleteNew(newsId: number): Observable<boolean>{
    return this.httpclient.delete(`http://localhost:5263/api/noticias/${newsId}`).pipe(
      map(()=> {
        this.notificacionsService.statusMessage.set(true);
        this.notificacionsService.statusTextMessage.set("Noticia eliminada con exito");
        return true;
      }),
      finalize(()=> this.newsLoading.set(false)),
      catchError(()=> of(false))
    );

  }

  //Actualizar noticia por id
  putNew(newsId:number,newUpdate:News): Observable<boolean>{
    return this.httpclient.put(`http://localhost:5263/api/noticias/${newsId}`,newUpdate)
    .pipe(
      map(()=> {
        this.notificacionsService.statusMessage.set(true);
        this.notificacionsService.statusTextMessage.set("Estado de noticia actualizado");
        return true;
      }),
      catchError(()=> of(false))
    )
  }
}
