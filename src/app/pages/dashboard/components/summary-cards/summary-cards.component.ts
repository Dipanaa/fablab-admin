import { Component, AfterViewInit } from '@angular/core';
import dblocalusuarios from '../../../../data/dblocalusuarios.json';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';

@Component({
  selector: 'summary-cards',
  templateUrl: './summary-cards.component.html',
})
export class SummaryCardsComponent implements AfterViewInit {
  proyectosFinal = dblocalproyectos.length;
  usuariosFinal = dblocalusuarios.length;
  proyectosAsignados = 0;

  proyectosCount = 0;
  usuariosCount = 0;
  proyectosAsignadosCount = 0;

  ngAfterViewInit() {
    // Sumar todos los proyectos asignados (aunque estén repetidos)
    this.proyectosAsignados = dblocalusuarios.reduce(
      (total, user) => total + (user.proyectos_asignados?.length || 0),
      0
    );

    this.animateCount('proyectosCount', this.proyectosFinal);
    this.animateCount('usuariosCount', this.usuariosFinal);
    this.animateCount('proyectosAsignadosCount', this.proyectosAsignados);
  }

  animateCount(
    prop: 'proyectosCount' | 'usuariosCount' | 'proyectosAsignadosCount',
    target: number
  ) {
    const duration = 800;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      this[prop] = Math.floor(progress * target);

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}
