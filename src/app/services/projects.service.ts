import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjectsResponse } from '../utils/responses/projectsResponse';
import { finalize, map, tap } from 'rxjs';
import { projectApiToProjectsArray } from '../utils/mappers/projectsMapper';
import { ProjectsInterface } from '../interfaces/projects.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  //Inyectar httpClient
  httpClient = inject(HttpClient);

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

  agregarProyecto(proyecto: any) {
    this.httpClient
      .post<ProjectsResponse[]>('http://localhost:5263/api/proyectos', proyecto)
      .subscribe({
        next: () => {
          console.log('Los datos fueron insertados con exito');
        },
        error: (err) => {
          console.log('Hubo un error en el ingreso del projectos', err);
        },
        complete: () => {
          console.log('Se completo la peticion');
        },
      });
  }

  editarProyecto(id: number) {
    console.log('ProjectsService: editarProyecto ejecutado', id);
  }

  eliminarProyecto(id: number) {
    console.log('ProjectsService: eliminarProyecto ejecutado', id);
  }
}
