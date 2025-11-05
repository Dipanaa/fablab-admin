import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import dbProyectos from '../../data/dblocalproyectos.json';
import { ProjectsInterface } from '../../interfaces/projects.interface';
import { ProjectsService } from '../../../app/services/projects.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';

@Component({
  selector: 'gestion-proyectos',
  standalone: true,
  imports: [NgFor, PaginationComponent, BuscadorComponent,ModalComponentComponent, StatusMessageComponent],
  templateUrl: './projects-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent {
  //Servicios
  projectsService = inject(ProjectsService);
  paginationService = inject(PaginationService);
  notificationStatusService = inject(NotificacionsStatusService);

  //Atributos
  openDeleteView= signal<boolean>(false);
  projectModalId = signal<number | undefined>(undefined);

  constructor() {
    // Llamada de prueba al iniciar
    this.projectsService.getProjects();
  }

  deleteProject(){
    if(!this.projectModalId){
      return;
    }
    this.projectsService.deleteProject(this.projectModalId()!).subscribe((status) =>
      {
        if(status){

          this.notificationStatusService.showMessage();
          this.openDeleteView.set(false);
          return;
        }

        this.notificationStatusService.showMessage();
        this.openDeleteView.set(false);


      })

  }

  modalDeleteView(id: number): void{
    this.projectModalId.set(id);
    this.openDeleteView()?this.openDeleteView.set(false):this.openDeleteView.set(true);
  }







}
