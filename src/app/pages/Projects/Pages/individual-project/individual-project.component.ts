import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { ProjectsService } from '../../../../services/projects.service';
import { ModalComponentComponent } from '../../../../shared/modal-component/modal-component.component';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';

@Component({
  selector: 'individual-project',
  templateUrl: './individual-project.component.html',
  imports: [
    CommonModule,
    ModalComponentComponent,
    BackButtonComponent,
    DatePipe
  ],
  standalone: true,
})
export class IndividualProjectComponent implements OnInit {
  //Servicios
  projectsService = inject(ProjectsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  notificacionsStatusService = inject(NotificacionsStatusService);

  //Atributos
  openDeleteView = signal<boolean>(false);
  projectModalId = signal<number | undefined>(undefined);
  projectsData = this.projectsService.projectsResource.value();
  loading = signal<boolean>(false);

  //Computed para recalcular señal
  projectFound = computed<ProjectsInterface | undefined>(()=>{
    if(this.projectsService.projectsResource.hasValue()){
      return this.projectsService.searchProjectById(this.projectModalId()!);
    }
    return;
  })


  //Ciclos de vida
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectModalId.set(id);
  }

  //Metodos
  deleteProject() {

    if (!this.projectModalId && this.loading()) {
      return;
    }

    this.loading.set(true);

    this.projectsService
      .deleteProject(this.projectModalId()!)
      .subscribe((status) => {
        if (status) {
          this.openDeleteView.set(false);
          this.loading.set(false);

          this.notificacionsStatusService.showMessage();
          this.projectsService.projectsResource.reload();
          this.router.navigate(['/proyectos']);
          return;
        }
        this.loading.set(false);
        this.openDeleteView.set(false);
        this.projectsService.projectsResource.reload();
        this.router.navigate(['/proyectos']);
      });
  }

  //Agregar Hito
  postPhase(){
  }


  putPhase(){
  }


  deletePhase(){
  }

}
