import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjectsResponse } from '../utils/responses-interfaces/projectsResponse';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { projectApiToProjectsArray } from '../utils/mappers/projectsMapper';
import { ProjectsInterface } from '../interfaces/projects.interface';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { ProjectsCreateInterface } from '../utils/request-interfaces/projectsCreateInterface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  //Servicios
  httpClient = inject(HttpClient);
  notificationsService = inject(NotificacionsStatusService);

  //Projects
  projectsData = signal<ProjectsInterface[]>([]);

  constructor() {}

  obtenerProyectos() {
    this.httpClient
      .get<ProjectsResponse[]>('http://localhost:5263/api/proyectos')
      .pipe(
        map((projects) => {
          return projectApiToProjectsArray(projects);
        }),
        tap((projects) => this.projectsData.set(projects)),
        finalize(() => console.log('Recoleccion de data finalizada'))
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log('Hubo un error en el ingreso del projectos', err);
        },
        complete: () => {
          console.log('Se completo la peticion');
        },
      });
    return this.projectsData;
  }

  //Agregar proyecto con id de usuario
  agregarProyecto(proyecto: ProjectsCreateInterface) {
    return this.httpClient.post<ProjectsResponse[]>('http://localhost:5263/api/proyectos', proyecto)
      .pipe(
        map(()=> {
          this.notificationsService.statusMessage.set(true);
          this.notificationsService.statusTextMessage.set("Proyecto creado correctamente");
          return true;
        }),
        catchError(()=> of(false))
      )
  }

  editarProyecto(id: number) {
    console.log('ProjectsService: editarProyecto ejecutado', id);
  }

  eliminarProyecto(id: number) {
    console.log('ProjectsService: eliminarProyecto ejecutado', id);
  }
}
