import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../../services/projects.service';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../../../shared/status-message/status-message.component';
// Importamos la NUEVA tarjeta
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'all-projects',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    RouterLink,
    StatusMessageComponent,
    DatePipe,
  ],
  templateUrl: './all-projects.component.html',
})
export class AllProjectsComponent implements OnInit {
  public projectsService = inject(ProjectsService);
  public notificacionStatus = inject(NotificacionsStatusService);

  constructor() {
    // Cargamos los proyectos al iniciar
    this.projectsService.getProjects();
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
