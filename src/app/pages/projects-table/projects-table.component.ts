import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProjectsService } from '../../../app/services/projects.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gestion-proyectos',
  standalone: true,
  imports: [
    NgFor,
    PaginationComponent,
    BuscadorComponent,
    ModalComponentComponent,
    StatusMessageComponent,
  ],
  templateUrl: './projects-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent {
  //Servicios
  route = inject(ActivatedRoute);
  private router = inject(Router);
  projectsService = inject(ProjectsService);
  paginationService = inject(PaginationService);
  notificationStatusService = inject(NotificacionsStatusService);

  //Atributos
  openDeleteView = signal<boolean>(false);
  projectModalId = signal<number | undefined>(undefined);

  constructor() {
    // Llamada de prueba al iniciar
    this.projectsService.getProjects();
  }

  //Ciclos de vida
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectModalId.set(id);
    console.log(id);
  }

  modalDeleteView(id: number): void {
    this.projectModalId.set(id);
    this.openDeleteView.set(true);
  }

  deleteProject() {
    console.log('Detele project', this.projectModalId());

    if (!this.projectModalId) {
      return;
    }
    this.projectsService
      .deleteProject(this.projectModalId()!)
      .subscribe((status) => {
        if (status) {
          this.openDeleteView.set(false);
          this.router.navigate(['/gestion-proyectos']);
          return;
        }

        this.openDeleteView.set(false);
      });
  }
}
