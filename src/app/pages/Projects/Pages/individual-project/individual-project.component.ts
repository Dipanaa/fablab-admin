import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { ProjectsService } from '../../../../services/projects.service';
import { ModalComponentComponent } from '../../../../shared/modal-component/modal-component.component';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { CustomFormsValidations } from '../../../../utils/FormsValidations/CustomValidations';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalEditComponent } from '../../../../shared/modal-edit/modal-edit.component';
import { PhaseProjectComponent } from './components/phase-project/phase-project.component';

@Component({
  selector: 'individual-project',
  templateUrl: './individual-project.component.html',
  imports: [
    CommonModule,
    ModalComponentComponent,
    BackButtonComponent,
    DatePipe,
    ReactiveFormsModule,
    ModalEditComponent,
    DatePipe,
    PhaseProjectComponent,
    RouterLink,
  ],
  standalone: true,
})
export class IndividualProjectComponent implements OnInit {
  //Servicios
  projectsService = inject(ProjectsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  notificacionsStatusService = inject(NotificacionsStatusService);
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  openDeleteView = signal<boolean>(false);
  openEditView = signal<boolean>(false);
  projectModalId = signal<number | undefined>(undefined);
  projectsData = this.projectsService.projectsByUserResource.value();
  loading = signal<boolean>(false);
  fbGeneric: FormGroup | undefined = undefined;

  //Computed para recalcular señal
  projectFound = computed<ProjectsInterface | undefined>(() => {
    if (this.projectsService.projectsByUserResource.hasValue()) {
      return this.projectsService.searchProjectById(this.projectModalId()!);
    }
    return;
  });

  //Formularios
  fbPhase: FormGroup = this.formBuilder.group({
    nombrehito: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  //Ciclos de vida
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectModalId.set(id);
  }

  //Metodos

  //Peticiones proyectos
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
          this.projectsService.projectsByUserResource.reload();
          this.router.navigate(['/proyectos']);
          return;
        }
        this.loading.set(false);
        this.openDeleteView.set(false);
        this.projectsService.projectsByUserResource.reload();
        this.notificacionsStatusService.showMessage();
        this.router.navigate(['/proyectos']);
      });
  }
}
