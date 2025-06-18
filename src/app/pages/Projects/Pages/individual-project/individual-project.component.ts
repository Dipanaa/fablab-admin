import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { CommonModule } from '@angular/common';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';

@Component({
  selector: 'individual-project',
  templateUrl: './individual-project.component.html',
  imports: [RouterLink, CommonModule],
  standalone: true,
})
export class IndividualProjectComponent implements OnInit {
  proyecto: ProjectsInterface[] = dblocalproyectos;

  proyectoEncontrado?: ProjectsInterface;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.proyecto);
    this.searchById(id);
    console.log(this.proyectoEncontrado);
  }

  constructor(private route: ActivatedRoute) {}

  searchById(id: number): void {
    const objectFind = this.proyecto.find(
      (proyecto) => proyecto.projectId === id
    );
    this.proyectoEncontrado = objectFind;
  }
}
