import { Component,inject, signal,} from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../services/projects.service';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { ProjectsCreateInterface } from '../../../../utils/request-interfaces/projectsCreateInterface';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';
import { CustomFormsValidations } from '../../../../utils/FormsValidations/CustomValidations';

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
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  imageSelected = signal<File | null>(null);
  //TODO: Igualar validadores a los del backend
  loading = signal<boolean>(false);
  newProjectForm: FormGroup = this.formbuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcionproyecto: ['', [Validators.required, Validators.maxLength(500)]],
    categoria: ['', [Validators.required]],
    areaaplicacion: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(5)]],
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
    if(this.newProjectForm.invalid || this.loading()){
      this.newProjectForm.touched;
      return;
    }

    this.loading.set(true);

    //Creacion de proyecto
    const newProject: ProjectsCreateInterface = this.newProjectForm.value;
    newProject.ids = [this.authService.userData()!.id_usuario!];

    //Formulario multiparte
    const formData = new FormData();

    //Narrowing imagen
    const image = this.imageSelected();

    if(image != null){
      formData.append("ImgUrl", image, image.name);
    }

    formData.append("dataproject", JSON.stringify(this.newProjectForm.value));

    //Ejecucion de observable y activacion de estado de insercion
    this.proyectsService.postProject(formData)
    .subscribe((status)=>{
      if(status){
        this.proyectsService.projectsByUserResource.reload();
        this.notificacionStatus.showMessage();
        this.router.navigateByUrl('/proyectos');
        return;
      }
      this.notificacionStatus.showMessage();
      this.loading.set(true);
    });
  }


}
