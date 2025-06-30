import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { News } from '../interfaces/news.interface';
import { finalize, map, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NewsService {

  private httpclient = inject(HttpClient);

  //News data
  newsResponse = signal<News[]>([]);

  //Carga de noticias señal
  newsLoading = signal<boolean>(false);
  errorHandler = signal<string | undefined>(undefined);



  constructor() {
    this.getNews();
  }

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
        this.errorHandler.set(undefined);
      },
      error: (error) => {
        this.errorHandler.set(error.statusText);
        console.log(error);
      }
    }
    );
  }

  postNew(news: News):void{

    this.httpclient.post("http://localhost:5263/api/noticias",news).subscribe({
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

  putNew(newsId:number,newUpdate:News){
    this.httpclient.put(`http://localhost:5263/api/noticias/${newsId}`,newUpdate).subscribe({
      next: () => {
        console.log("El registro fue actualizado con exito");
      },
      error: (err) => {
        console.log("Hubo un error al actualizar la noticia",err);
      },
      complete: () => {
        console.log("Se completo la peticion put");
      }
    })

  }




}
