// src/app/pages/user-home/user-home.component.ts
import { NgFor, DatePipe, SlicePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NewsService } from '../../services/news.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'user-home',
  imports: [NgFor, RouterLink, DatePipe, SlicePipe],
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent {
  authService = inject(AuthService);
  newsService = inject(NewsService);
  projectsService = inject(ProjectsService);

  username: string | null = '';
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });

    //Obtener noticias
    this.newsService.getNews();

    //Obtener noticias
    this.projectsService.obtenerProyectos();
  }

  // Proyectos destacados simulados
  proyectosDestacados = [
    {
      titulo: 'Drone autónomo',
      autor: 'María López',
      categoria: 'Robótica',
      img: 'https://placehold.co/300x200',
    },
    {
      titulo: 'Aplicación FabLab',
      autor: 'Alexis Pérez',
      categoria: 'Software',
      img: 'https://placehold.co/300x200',
    },
  ];

  // Proyectos del usuario
  misProyectos = [
    {
      titulo: 'Aplicación FabLab',
      ultimoAvance: 'Se agregó login de usuarios.',
    },
    {
      titulo: 'Impresión de ranita 3D',
      ultimoAvance: 'Versión con articulación mejorada.',
    },
    {
      titulo: 'Aplicación FabLab',
      ultimoAvance: 'Se agregó login de usuarios.',
    },
  ];
}
