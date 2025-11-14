import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable } from 'rxjs';
import { ProjectsByUser } from '../interfaces/graphicsInterfaces/projectsByUser.interface';

@Injectable({providedIn: 'root'})
export class GraphicsService {

  httpClient = inject(HttpClient);



  graphicsResource = rxResource({
    loader: () => this.getGraphicsProjectsByUser()
  })



  getGraphicsProjectsByUser(): Observable<ProjectsByUser>{
    return this.httpClient.get<ProjectsByUser>(`http://localhost:5263/api/graficos/proyectoporusuario`)
    .pipe(
      map((data)=> {
        console.log(data);
        return data;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        console.log(err);
        return [];
      })
    );



  }





}
