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
  //Servicios
  projectsService = inject(ProjectsService);
  notificacionStatus = inject(NotificacionsStatusService);

  //Atributos
  projectsData = this.projectsService.projectsResource.value();


  proyecto: any[]  = dblocalproyectos;
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
