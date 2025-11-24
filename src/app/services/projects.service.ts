import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjectsResponse } from '../utils/responses-interfaces/projectsResponse';
import { catchError, delay, finalize, map, Observable, of } from 'rxjs';
import { projectApiToProjectsArray } from '../utils/mappers/projectsMapper';
import { ProjectsInterface } from '../interfaces/projects.interface';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { environment } from '../../environments/environments';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  //Servicios
  httpClient = inject(HttpClient);
  authService = inject(AuthService);
  notificationStatusService = inject(NotificacionsStatusService);

  //Projects
  projectsData = signal<ProjectsInterface[]>([]);
  projectsDataByUser = signal<ProjectsInterface[]>([]);
  postProjectLoader = signal<boolean>(false);
  private projectUrl = `${environment.apiKey}/api/proyectos`;

  projectsResource = rxResource({
    loader: () => {
      return this.getProjects();
    },
  });

  projectsByUserResource = rxResource({
    loader: () => {
      return this.getProjectsByUser();
    },
  });

  getProjectsByUser(): Observable<boolean> {
    return this.httpClient
      .get<ProjectsResponse[]>(
        `${this.projectUrl}/${this.authService.userData()?.id_usuario}`
      )
      .pipe(
        map((projects) => {
          this.projectsDataByUser.update(() =>
            projectApiToProjectsArray(projects)
          );
          return true;
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }

  getProjects(): Observable<boolean> {
    return this.httpClient.get<ProjectsResponse[]>(this.projectUrl).pipe(
      map((projects) => {
        this.projectsData.update(() => projectApiToProjectsArray(projects));
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  //Agregar proyecto con id de usuario
  postProject(proyecto: any) {
    return this.httpClient
      .post<ProjectsResponse[]>(this.projectUrl, proyecto)
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
        finalize(() => this.postProjectLoader.set(false))
      );
  }

  putProject(id: number, projectData: any): Observable<boolean> {
    if (this.postProjectLoader()) {
      return of(false);
    }
    this.postProjectLoader.set(true);

    // Usamos el ID pasado por argumento para la URL
    // Usamos projectData (el payload limpio) para el cuerpo
    return this.httpClient.put(`${this.projectUrl}/${id}`, projectData).pipe(
      map(() => {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusTextMessage.set(
          'Proyecto actualizado correctamente'
        );
        this.projectsResource.reload(); // Recargar lista
        return true;
      }),
      catchError((err) => {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusErrorMessage.set(
          'Error al actualizar.'
        );
        console.error('Error PUT:', err);
        return of(false);
      }),
      finalize(() => this.postProjectLoader.set(false))
    );
  }

  deleteProject(id: number) {
    return this.httpClient.delete(`${this.projectUrl}/${id}`).pipe(
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
          'Se produjo un error al eliminar el proyecto'
        );
        return of(false);
      })
    );
  }

  //Buscar proyecto
  searchProjectById(id: number): ProjectsInterface | undefined {
    if (this.projectsDataByUser().length == 0) {
      return;
    }
    if (this.projectsDataByUser().length == 0) {
      return;
    }
    const projectFound = this.projectsDataByUser().find((pro) => pro.id == id);
    return projectFound;
  }

  //Peticiones Http para hitos
  postPhaseProject(id: number, phaseData: any) {
    if (this.postProjectLoader() || !phaseData) {
      return of(false);
    }

    this.postProjectLoader.set(true);

    return this.httpClient
      .post(`${this.projectUrl}/hitoproyecto/${id}`, phaseData)
      .pipe(
        delay(5000),
        map(() => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusTextMessage.set(
            'Hito creado correctamente'
          );
          return true;
        }),
        catchError(() => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusErrorMessage.set(
            'Error en la creación del hito'
          );
          return of(false);
        }),
        finalize(() => this.postProjectLoader.set(false))
      );
  }

  deletePhaseProject(id: number) {
    return this.httpClient
      .delete(`${this.projectUrl}/hitoproyecto/hito/${id}`)
      .pipe(
        map(() => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusTextMessage.set(
            'Hito eliminado correctamente'
          );
          return true;
        }),
        //TODO: Implementar interfaz de error en base a asp net
        catchError((err) => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusErrorMessage.set(
            'Se produjo un error al eliminar el Hito'
          );
          return of(false);
        })
      );
  }

  putPhaseProject(phaseData: any, id: number) {
    return this.httpClient
      .put(`${this.projectUrl}/hitoproyecto/hito/${id}`, phaseData)
      .pipe(
        map(() => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusTextMessage.set(
            'Hito actualizado correctamente'
          );
          return true;
        }),
        //TODO: Implementar interfaz de error en base a asp net
        catchError((err) => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusErrorMessage.set(
            'Se produjo un error al actualizar el Hito'
          );
          return of(false);
        })
      );
  }
}
