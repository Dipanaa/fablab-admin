import { Component, inject, input, output, signal } from '@angular/core';
import { BackButtonComponent } from '../../../../../../shared/back-button/back-button';
import { ProjectsService } from '../../../../../../services/projects.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomFormsValidations } from '../../../../../../utils/FormsValidations/CustomValidations';
import { NotificacionsStatusService } from '../../../../../../services/notificacionsStatus.service';

@Component({
  selector: 'app-modal-phase-add-project',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-phase-add-project.component.html',
})
export class ModalPhaseAddProjectComponent {
  //Servicios
  projectsService = inject(ProjectsService);
  formBuilder = inject(FormBuilder);
  notificacionsStatusService = inject(NotificacionsStatusService);
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  show = input<boolean>(false);
  closeModalView = output<boolean>();
  loading = signal<boolean>(false);
  idProject = input<number | undefined>(undefined);

  fbAddPhase: FormGroup = this.formBuilder.group({
    "nombrehito":["",[Validators.required]],
    "descripcion":["",[Validators.required]]
  });


  //Metodos
  postAddPhase(){
    if(this.fbAddPhase.invalid || this.loading()){
      return;
    }

    this.loading.set(true);

    this.projectsService.postPhaseProject(this.idProject()!,this.fbAddPhase.value)
    .subscribe((status)=> {
      if(status){
        this.notificacionsStatusService.showMessage();
        this.loading.set(false);
        this.projectsService.projectsResource.reload();
        this.closeModalView.emit(false);

        return;
      }
      this.notificacionsStatusService.showMessage();
      this.loading.set(false);
      this.projectsService.projectsResource.reload();
      this.closeModalView.emit(false);

    });
  }

  closeModal(){
    this.closeModalView.emit(false);
  }

}
