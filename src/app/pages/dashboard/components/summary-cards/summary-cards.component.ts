import { Component, AfterViewInit, inject, signal, effect } from '@angular/core';
import dblocalusuarios from '../../../../data/dblocalusuarios.json';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../../services/projects.service';
import { NewsService } from '../../../../services/news.service';

@Component({
  selector: 'summary-cards',
  templateUrl: './summary-cards.component.html',
  imports: [RouterLink],
})
export class SummaryCardsComponent implements AfterViewInit {

  //TODO: Crear servicio de metricas para servicios

  projectsService = inject(ProjectsService);
  newsService = inject(NewsService);

  proyectosFinal = signal<number>(0);
  usuariosFinal = dblocalusuarios.length;
  noticiasFinal = signal<number>(0);
  proyectosAsignados = 0;

  proyectosCount = 0;
  usuariosCount = 0;
  proyectosAsignadosCount = 0;
  noticiasCount = 0;

  constructor(){
    this.projectsService.obtenerProyectos();
    this.newsService.getNews();
    console.log(this.noticiasFinal());

    effect(()=>{

      const proyectos = this.projectsService.projectsData().length;
      const noticias = this.newsService.newsResponse();
      console.log(this.newsService.newsResponse());
      if (noticias){
        this.noticiasFinal.set(this.newsService.newsResponse().length);
        this.proyectosFinal.set(this.projectsService.projectsData().length);

        this.animateCount('proyectosCount',this.projectsService.projectsData().length);
        this.animateCount('noticiasCount',this.newsService.newsResponse().length);
      }

    })


  }



  ngAfterViewInit() {
    // Sumar todos los proyectos asignados (aunque estén repetidos)
    this.proyectosAsignados = dblocalusuarios.reduce(
      (total, user) => total + (user.proyectos_asignados?.length || 0),
      0
    );

    this.animateCount('usuariosCount', this.usuariosFinal);
    this.animateCount('proyectosAsignadosCount', this.proyectosAsignados);


  }

  animateCount(
    prop: 'proyectosCount' | 'usuariosCount' | 'proyectosAsignadosCount' | 'noticiasCount'  ,
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
