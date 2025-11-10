import { Component, inject } from '@angular/core';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { ProjectsService } from '../../../../services/projects.service';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../../../shared/status-message/status-message.component';
@Component({
  selector: 'all-projects',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, StatusMessageComponent],
  templateUrl: './all-projects.component.html',
})
export class AllProjectsComponent {
  //Inyeccion de servicios
  projectsService = inject(ProjectsService);
  notificacionStatus = inject(NotificacionsStatusService);

  constructor() {
    //TODO: Implementar rxResource en el servicio
    this.projectsService.getProjects();
    console.log(this.projectsService.projectsData());
  }

  proyecto: ProjectsInterface[] = dblocalproyectos;
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
