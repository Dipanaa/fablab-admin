import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjectsResponse } from '../utils/responses-interfaces/projectsResponse';
import { catchError, delay, finalize, map, Observable, of, single, tap } from 'rxjs';
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
  postProjectLoader = signal<boolean>(false);

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
        console.log(projects);
        this.projectsData.update(()=>projectApiToProjectsArray(projects));
        return true;
      }),
      catchError((error)=> {
        return of(false);
      })
    )

  }

  //Agregar proyecto con id de usuario
  postProject(project: any): Observable<boolean> {
    if(this.postProjectLoader() || !project){
      return of(false);
    }

    this.postProjectLoader.set(true);

    return this.httpClient.post<ProjectsResponse[]>('http://localhost:5263/api/proyectos', project)
      .pipe(
        delay(5000),
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
        }),
        finalize(()=> this.postProjectLoader.set(false))
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
            "Se produjo un error al eliminar el proyecto"
          );
          return of(false);
        })
      );
  }

  //Buscar proyecto
  searchProjectById(id:number): ProjectsInterface | undefined{
    console.log(this.projectsData());
    if(this.projectsData().length == 0){
      return;
    }
    if(this.projectsData().length == 0){
      return;
    }
    const projectFound = this.projectsData().find(pro => pro.id == id);
    console.log(projectFound);
    return projectFound;
  }


}
