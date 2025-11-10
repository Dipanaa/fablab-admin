import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../services/projects.service';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { ProjectsCreateInterface } from '../../../../utils/request-interfaces/projectsCreateInterface';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';

@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  imports: [ReactiveFormsModule, BackButtonComponent],
})
export class NewProjectComponent {
  //Inyeccion de servicios
  proyectsService = inject(ProjectsService);
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  notificacionStatus = inject(NotificacionsStatusService);

  //Atributos
  imageSelected = signal<File | null>(null);
  //TODO: Igualar validadores a los del backend
  newProjectForm: FormGroup = this.formbuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcionproyecto: ['', [Validators.required, Validators.maxLength(500)]],
    categoria: ['', [Validators.required]],
    areaaplicacion: ['', [Validators.required]],
    fechainicio: [''],
  });

  //Metodos
  imageFileSelected(event: Event): void{
    const input = event.target as HTMLInputElement;

    if (input.files!.length > 0){
      this.imageSelected.set(input.files![0] as File);
      console.log(this.imageSelected());
      return;
    }
    this.imageSelected.set(null);
  }

  submitNewProject(): void{
    if(this.newProjectForm.invalid){
      this.newProjectForm.reset();
      return;
    }

    //Creacion de proyecto
    const newProject: ProjectsCreateInterface = this.newProjectForm.value;
    newProject.ids = [this.authService.userData()?.id_usuario!];

    //Formulario multiparte
    const formData = new FormData();

    if(this.imageSelected() != null){
      formData.append("ImgUrl", this.imageSelected()!, this.imageSelected()?.name);
    }

    formData.append("dataproject", JSON.stringify(this.newProjectForm.value));

    //Ejecucion de observable y activacion de estado de insercion
    this.proyectsService.postProject(formData)
    .subscribe((status)=>{
      if(status){
        console.log(this.notificacionStatus.statusTextMessage());
        this.notificacionStatus.showMessage();
        this.router.navigateByUrl('/proyectos');
        return;
      }
      console.log(this.notificacionStatus.statusErrorMessage());
      this.notificacionStatus.showMessage();
      this.router.navigateByUrl('/proyectos');
    });
  }


}
