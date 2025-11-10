import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { ProjectsService } from '../../../../services/projects.service';
import { ModalComponentComponent } from '../../../../shared/modal-component/modal-component.component';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';

@Component({
  selector: 'individual-project',
  templateUrl: './individual-project.component.html',
  imports: [
    RouterLink,
    CommonModule,
    ModalComponentComponent,
    BackButtonComponent,
  ],
  standalone: true,
})
export class IndividualProjectComponent implements OnInit {
  //Servicios
  projectsService = inject(ProjectsService);
  route = inject(ActivatedRoute);
  private router = inject(Router);

  //Atributos
  projectoFound?: ProjectsInterface;
  openDeleteView = signal<boolean>(false);
  projectModalId = signal<number | undefined>(undefined);

  //Ciclos de vida
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectModalId.set(id);
    console.log(id);
  }

  //Metodos
  deleteProject() {
    console.log('Detele project', this.projectModalId());

    if (!this.projectModalId) {
      return;
    }
    this.projectsService
      .deleteProject(this.projectModalId()!)
      .subscribe((status) => {
        if (status) {
          this.openDeleteView.set(false);
          this.router.navigate(['/proyectos']);
          return;
        }

        this.openDeleteView.set(false);
      });
  }
}
