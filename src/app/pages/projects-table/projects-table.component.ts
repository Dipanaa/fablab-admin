import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ProjectsService } from '../../../app/services/projects.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsInterface } from '../../interfaces/projects.interface';

@Component({
  selector: 'gestion-proyectos',
  standalone: true,
  imports: [
    NgFor,
    PaginationComponent,
    BuscadorComponent,
    ModalComponentComponent,
    StatusMessageComponent,
    DatePipe
  ],
  templateUrl: './projects-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent {
  //Servicios
  route = inject(ActivatedRoute);
  projectsService = inject(ProjectsService);
  paginationService = inject(PaginationService);
  notificationStatusService = inject(NotificacionsStatusService);
  public searchTerm = signal<string>('');

  //Atributos
  openDeleteView = signal<boolean>(false);
  projectModalId = signal<number | undefined>(undefined);
  projectsData = this.projectsService.projectsResource.value();

  loading = signal<boolean>(false);


  public filteredProjects = computed<ProjectsInterface[]>(() => {
    const term = this.searchTerm().toLowerCase();
    // 🚨 CLAVE: Lee la lista REAL de proyectos del servicio (NO de una propiedad local).
    const projects = this.projectsService.projectsData();

    if (!term) {
      return projects;
    }

    return projects.filter(
      (proyecto) =>
        proyecto.titulo.toLowerCase().includes(term) ||
        proyecto.descripcionproyecto.toLowerCase().includes(term) ||
        proyecto.categoria.toLowerCase().includes(term)
    );
  });

  onSearch(term: string): void {
    // Actualiza la signal del término, lo que automáticamente recalcula filteredProjects()
    this.searchTerm.set(term);
  }

  constructor() {
    // Llamada de prueba al iniciar
    this.projectsService.getProjects();
    effect(() => {
      const projectList = this.filteredProjects();

      // 1. Alimenta al PaginationService con la lista completa de la DB
      this.paginationService.setDataList(projectList);

      // 2. Resetea la página a 1 cada vez que se carga nueva data (previene el bug de la página 3)
      this.paginationService.goToPage(1);
    });
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

    if (!this.projectModalId || this.loading()) {
      return;
    }

    this.loading.set(true);

    this.projectsService
      .deleteProject(this.projectModalId()!)
      .subscribe((status) => {
        if (status) {
          this.openDeleteView.set(false);
          this.projectsService.projectsResource.reload();
          this.notificationStatusService.showMessage();
          this.loading.set(false);
          return;
        }
        this.notificationStatusService.showMessage();
        this.openDeleteView.set(false);
        this.loading.set(false);
      });
  }
}
