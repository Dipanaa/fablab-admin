import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../services/projects.service';
import { SuccessComponent } from '../../../../shared/success-component/success-component.component';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { ProjectsCreateInterface } from '../../../../utils/request-interfaces/projectsCreateInterface';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  imports: [
      ReactiveFormsModule,
    ],
})
export class NewProjectComponent {

  //Inyeccion de servicios
  proyectsService = inject(ProjectsService);
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  notificacionStatus = inject(NotificacionsStatusService);


  //Atributos
  //TODO: Igualar validadores a los del backend
  newProjectForm: FormGroup = this.formbuilder.group({
    titulo: ["",[Validators.required,Validators.minLength(5)]],
    descripcionproyecto: ["",[Validators.required,Validators.maxLength(500)]],
    categoria: ["",[Validators.required]],
    areaaplicacion: ["",[Validators.required]],
    fechainicio: [""]
  })


  submitNewProject(): void{
    //TODO: Arreglar interfaz e ingresar id de usuario en interfaz

    if(this.newProjectForm.invalid){
      console.log("Proyecto con campos invalidos");
      this.newProjectForm.reset();
      return;
    }

    //Creacion de proyecto
    const newProject: ProjectsCreateInterface = this.newProjectForm.value;
    newProject.ids = [this.authService.userData()?.id!];

    console.log(newProject);

    //Ejecucion de observable y activacion de estado de insercion
    this.proyectsService.agregarProyecto(newProject)
    .subscribe((status)=>{
      if(status){
        console.log(this.notificacionStatus.statusTextMessage());
        this.notificacionStatus.showMessage();
        this.router.navigateByUrl("/proyectos");
        return;
      }
    });


  }

}
