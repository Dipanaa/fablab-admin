import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../services/projects.service';
import { SuccessComponent } from '../../../../shared/success-component/success-component.component';

@Component({
  selector: 'new-project',
  imports: [ReactiveFormsModule,SuccessComponent],
  templateUrl: './new-project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent {

  //Inyeccion de servicios
  proyectsService = inject(ProjectsService);
  formbuilder = inject(FormBuilder);
  renderer2 = inject(Renderer2);

  //Tomamos referencias
  @ViewChild("successPost") successPost!: ElementRef;



  //TODO: Igualar validadores a los del backend
  newProjectForm: FormGroup = this.formbuilder.group({
    titulo: ["",[Validators.required]],
    descripcionproyecto: [""],
    categoria: [""],
    areaaplicacion: [""],
    fechainicio: [""]
  })


  submitNewProject(){
    //TODO: Arreglar interfaz e ingresar id de usuario en interfaz
    const newProject: any = this.newProjectForm.value;

    //ARREGLAR PORQUE ESTA HARDCODEADO
    newProject.usuarioid = 2;

    console.log(newProject);

    this.renderer2.removeClass(this.successPost.nativeElement,"hidden");
    this.renderer2.addClass(this.successPost.nativeElement,"flex");
    this.proyectsService.agregarProyecto(newProject);


  }

}
