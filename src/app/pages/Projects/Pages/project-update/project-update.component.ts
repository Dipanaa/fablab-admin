import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';

@Component({
  selector: 'project-update',
  imports: [BackButtonComponent],
  templateUrl: './project-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectUpdateComponent implements OnInit {
  idProyecto!: number;
  proyectoEncontrado?: ProjectsInterface;
  proyectos: any[]= dblocalproyectos;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idProyecto = Number(params.get('id'));
      this.proyectoEncontrado = this.proyectos.find(
        (proyecto) => proyecto.id === this.idProyecto
      );

      console.log('Proyecto a actualizar:', this.proyectoEncontrado);
    });
  }

  guardarActualizacion(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const nuevaActualizacion = {
      titulo: data.get('titulo'),
      descripcion: data.get('descripcion'),
      fecha: new Date().toISOString(),
      imagenUrl: '',
    };

    const archivo = data.get('imagen') as File;
    if (archivo && archivo.size > 0) {
      const lector = new FileReader();
      lector.onload = () => {
        nuevaActualizacion.imagenUrl = lector.result as string;

        this.guardarEnStorage(nuevaActualizacion);
        alert('Actualización guardada con imagen.');
        form.reset();
      };
      lector.readAsDataURL(archivo);
    } else {
      this.guardarEnStorage(nuevaActualizacion);
      alert('Actualización guardada sin imagen.');
      form.reset();
    }
  }

  guardarEnStorage(actualizacion: any) {
    const updates = JSON.parse(
      localStorage.getItem('actualizacionesProyecto') || '[]'
    );
    updates.push(actualizacion);
    localStorage.setItem('actualizacionesProyecto', JSON.stringify(updates));
  }
}
