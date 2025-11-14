import { Component, AfterViewInit, inject, signal, effect } from '@angular/core';
import dblocalusuarios from '../../../../data/dblocalusuarios.json';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../../services/projects.service';
import { NewsService } from '../../../../services/news.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'summary-cards',
  templateUrl: './summary-cards.component.html',
  imports: [RouterLink],
})
export class SummaryCardsComponent implements AfterViewInit {

  //TODO: Crear servicio de metricas para servicios y cambiar a INGLES

  projectsService = inject(ProjectsService);
  usersService = inject(UsersService)
  newsService = inject(NewsService);

  proyectosFinal = signal<number>(0);
  usuariosFinal = signal<number>(0)
  noticiasFinal = signal<number>(0);
  proyectosAsignados = 0;

  proyectosCount = 0;
  usuariosCount = 0;
  proyectosAsignadosCount = 0;
  noticiasCount = 0;

  constructor(){
    this.projectsService.getProjects();
    this.usersService.getUsers();
    this.newsService.getNews();

    effect(()=>{

      const proyectos = this.projectsService.projectsData().length;
      const usuarios = this.usersService.usersData().length;
      const noticias = this.newsService.newsResponse();
      if (noticias){
        this.noticiasFinal.set(this.newsService.newsResponse().length);
        this.proyectosFinal.set(this.projectsService.projectsData().length);
        this.usuariosFinal.set(this.usersService.usersData().length);

        this.animateCount('proyectosCount',this.projectsService.projectsData().length);
        this.animateCount('noticiasCount',this.newsService.newsResponse().length);
        this.animateCount('usuariosCount',this.usersService.usersData().length);
      }

    })


  }



  ngAfterViewInit() {
    // Sumar todos los proyectos asignados (aunque estén repetidos)
    this.proyectosAsignados = dblocalusuarios.reduce(
      (total, user) => total + (user.proyectos_asignados?.length || 0),
      0
    );

    this.animateCount('proyectosAsignadosCount', this.proyectosAsignados);


  }

  animateCount(
    prop: 'proyectosCount' | 'usuariosCount' | 'proyectosAsignadosCount' | 'noticiasCount'  ,
    target: number
  ) {
    const duration = 1000;
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
