import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsInterface } from '../../../../../../interfaces/projects.interface';
import { CustomFormsValidations } from '../../../../../../utils/FormsValidations/CustomValidations';
import { ProjectsService } from '../../../../../../services/projects.service';
import { NotificacionsStatusService } from '../../../../../../services/notificacionsStatus.service';
import { DatePipe } from '@angular/common';
import { ModalComponentComponent } from '../../../../../../shared/modal-component/modal-component.component';
import { ModalEditComponent } from '../../../../../../shared/modal-edit/modal-edit.component';
import { StatusMessageComponent } from '../../../../../../shared/status-message/status-message.component';
import { ModalPhaseAddProjectComponent } from "../modal-phase-add-project/modal-phase-add-project.component";

@Component({
  selector: 'phase-project',
  imports: [DatePipe, ModalComponentComponent, ModalEditComponent, StatusMessageComponent, ModalPhaseAddProjectComponent],
  templateUrl: './phase-project.component.html',
})
export class PhaseProjectComponent {
   //Servicios
  projectsService = inject(ProjectsService);
  formBuilder = inject(FormBuilder);
  notificacionsStatusService = inject(NotificacionsStatusService);
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  openAddView = signal<boolean>(false)
  openDeleteView = signal<boolean>(false);
  openEditView = signal<boolean>(false);
  projectId = input<number | undefined>(undefined);
  phaseId = signal<number | undefined>(undefined);
  // projectsData = this.projectsService.projectsResource.value();
  loading = signal<boolean>(false);


  //Computed para recalcular señal
  projectFound = computed<ProjectsInterface | undefined>(()=>{
    if(this.projectsService.projectsByUserResource.hasValue()){
      return this.projectsService.searchProjectById(this.projectId()!);
    }
    return;
  })

  //Formularios
  fbPhase: FormGroup = this.formBuilder.group({
    "nombrehito":["",[Validators.required]],
    "descripcion":["",[Validators.required]]
  });


  //Ciclos de vida
  ngOnInit() {
  }


  //Metodos


  //Actualizar la fase de un proyecto
  putPhase(dataForm: FormGroup){
    this.fbPhase.patchValue(dataForm);

    if(this.fbPhase.invalid || this.loading() || !dataForm){
      return;
    }

    this.loading.set(true);

    this.projectsService
    .putPhaseProject(this.fbPhase.value,this.phaseId()!)
    .subscribe((status) => {
      if (status) {
        this.notificacionsStatusService.showMessage();
      }
      this.loading.set(false);
      this.openDeleteView.set(false);
      this.projectsService.projectsByUserResource.reload();
      this.openEditView.set(false);

    });


  }

  //Eliminar la fase de un proyecto
  deletePhase(){
    if(!this.phaseId() || this.loading()){
      return;
    }

    this.loading.set(true);

    this.projectsService
    .deletePhaseProject(this.phaseId()!)
    .subscribe((status) => {
      if (status) {
        this.openDeleteView.set(false);
        this.loading.set(false);
        this.notificacionsStatusService.showMessage();
        this.projectsService.projectsByUserResource.reload();
        this.openDeleteView.set(false);

        return;
      }
      this.loading.set(false);
      this.openDeleteView.set(false);
      this.projectsService.projectsByUserResource.reload();
      this.openDeleteView.set(false);

    });
  }

  //Abrir modales
  modalDeleteView(id: number) {
    this.phaseId.set(id);
    this.openDeleteView.set(true);
  }

  modalEditView(id: number) {
    this.phaseId.set(id);
    this.openEditView.set(true);
  }

  modalAddEditView(){
    this.openAddView.set(true);

  }


}
