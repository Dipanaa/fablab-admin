import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjectsResponse } from '../utils/responses-interfaces/projectsResponse';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { projectApiToProjectsArray } from '../utils/mappers/projectsMapper';
import { ProjectsInterface } from '../interfaces/projects.interface';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { ProjectsCreateInterface } from '../utils/request-interfaces/projectsCreateInterface';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  //Servicios
  httpClient = inject(HttpClient);
  notificationStatusService = inject(NotificacionsStatusService);

  //Projects
  projectsData = signal<ProjectsInterface[]>([]);

  //TODO: Implementar rxResource para obtencion de data

  projectsResource = rxResource({
    loader: () => {
      return this.getProjects();
    }
  })

  getProjects(): Observable<boolean> {
    return this.httpClient
    .get<ProjectsResponse[]>('http://localhost:5263/api/proyectos')
    .pipe(
      map((projects) => {
        this.projectsData.set(projectApiToProjectsArray(projects))
        return true;
      }),
      catchError((error)=> {
        return of(false);
      })
    )

  }

  //Agregar proyecto con id de usuario
  postProject(proyecto: any) {
    return this.httpClient.post<ProjectsResponse[]>('http://localhost:5263/api/proyectos', proyecto)
      .pipe(
        map(() => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusTextMessage.set(
            'Proyecto creado correctamente'
          );
          return true;
        }),
        catchError(() => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusErrorMessage.set(
            'Error en la creación del proyecto'
          );
          return of(false);
        })
      );
  }

  putProject(id: number) {
    console.log('ProjectsService: editarProyecto ejecutado', id);
  }

  deleteProject(id: number) {
    return this.httpClient
      .delete(`http://localhost:5263/api/proyectos/${id}`)
      .pipe(
        map(() => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusTextMessage.set(
            'proyecto eliminado correctamente'
          );
          return true;
        }),
        //TODO: Implementar interfaz de error en base a asp net
        catchError((err) => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusErrorMessage.set(
            err.error.detail
          );
          return of(false);
        })
      );
  }
}
