import { Component } from '@angular/core';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
@Component({
  selector: 'all-projects',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: './all-projects.component.html',
})
export class AllProjectsComponent {
  proyecto: ProjectsInterface[] = dblocalproyectos;
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
