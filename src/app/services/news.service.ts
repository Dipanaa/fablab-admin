import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { News } from '../interfaces/news.interface';
import { catchError, finalize, map, Observable, of, pipe, tap } from 'rxjs';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class NewsService {
  //Servicios
  private httpclient = inject(HttpClient);
  private notificationsService = inject(NotificacionsStatusService);

  //News data
  newsResponse = signal<News[]>([]);

  //Carga de noticias señal
  newsLoading = signal<boolean>(false);
  postLoading = signal<boolean>(false);
  errorHandler = signal<string | undefined>(undefined);

  //Obtencion de noticias al inyectar servicios
  constructor() {
    this.getNews();
  }

  //Metodo get news suscrito
  getNews(): void {
    if (this.newsLoading()) {
      console.log('La peticion no puede cargar aun...');
      return;
    }
    this.newsLoading.set(true);

    this.httpclient
      .get<News[]>(`${environment.apiKey}/api/noticias`)
      .pipe(
        finalize(() => {
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
        },
      });
  }

  //Metodo get news para rxResource
  getNewsRxResource(): Observable<News[]> {
    return this.httpclient
      .get<News[]>(`${environment.apiKey}/api/noticias`)
      .pipe(tap((resp) => this.newsResponse.set(resp)));
  }

  //Creacion de noticia
  postNew(news: News): Observable<boolean> {
    if (this.postLoading()) {
      return of(false);
    }
    //Cargando
    this.postLoading.set(true);

    return this.httpclient
      .post(`${environment.apiKey}/api/noticias`, news)
      .pipe(
        map(() => {
          this.notificationsService.statusMessage.set(true);
          this.notificationsService.statusTextMessage.set(
            'Noticia creada correctamente'
          );
          return true;
        }),
        finalize(() => this.newsLoading.set(false)),
        catchError(() => of(false))
      );
  }

  //Eliminacion de noticias
  deleteNew(newsId: number): Observable<boolean> {
    return this.httpclient
      .delete(`${environment.apiKey}/api/noticias/${newsId}`)
      .pipe(
        map(() => {
          this.notificationsService.statusMessage.set(true);
          this.notificationsService.statusTextMessage.set(
            'Noticia eliminada con exito'
          );
          return true;
        }),
        finalize(() => this.newsLoading.set(false)),
        catchError(() => of(false))
      );
  }

  //Actualizar noticia por id
  putNew(newsId: number, newUpdate: News): Observable<boolean> {
    return this.httpclient
      .put(`${environment.apiKey}/api/noticias/${newsId}`, newUpdate)
      .pipe(
        map(() => {
          this.notificationsService.statusMessage.set(true);
          this.notificationsService.statusTextMessage.set(
            'Estado de noticia actualizado'
          );
          return true;
        }),
        catchError(() => of(false))
      );
  }
}
