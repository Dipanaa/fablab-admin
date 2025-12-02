import { inject, Injectable } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Injectable({providedIn: 'root'})
export class CleanSessionService {

  //Servicios
  projectService = inject(ProjectsService);


  //Metodos

  cleanUpSession(): void{
    this.projectService.projectsDataByUser.set([]);
    console.log(this.projectService.projectsDataByUser());

  }

}
