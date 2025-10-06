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

  postNew(news: News):void{

    if(this.newsLoading()){
      return;
    }
    this.newsLoading.set(true);

    this.httpclient.post("http://localhost:5263/api/noticias",news).pipe(
      finalize(()=> {
        this.newsLoading.set(false);
      })
    )
      .subscribe({
      next: () => {
        console.log("Los datos fueron insertados con exito");
      },
      error: (err) => {
        console.log("Hubo un error en el ingreso de la noticia",err);
      },
      complete: () => {
        console.log("Se completo la peticion");
      }
    })

  }


  deleteNew(newsId: number): void{
    this.httpclient.delete(`http://localhost:5263/api/noticias/${newsId}`).subscribe({
      next: () => {
        console.log("El registro fue eliminado con exito");
      },
      error: (err) => {
        console.log("Hubo un error al eliminar la noticia",err);
      },
      complete: () => {
        console.log("Se completo la peticion delete");
      }
    });

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
