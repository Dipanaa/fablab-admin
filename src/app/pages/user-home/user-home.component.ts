// src/app/pages/user-home/user-home.component.ts
import { NgFor, DatePipe, SlicePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NewsService } from '../../services/news.service';
import { ProjectsService } from '../../services/projects.service';
import { FooterComponent } from '../../shared/footer/footer';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { NewsReaderComponent } from '../../shared/news-reader.component/news-reader.component';

@Component({
  selector: 'user-home',
  imports: [
    NgFor,
    RouterLink,
    DatePipe,
    SlicePipe,
    FooterComponent,
    StatusMessageComponent,
    NewsReaderComponent,
  ],
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent {
  //Servicios
  authService = inject(AuthService);
  newsService = inject(NewsService);
  projectsService = inject(ProjectsService);
  notificacionsStatusService = inject(NotificacionsStatusService);

  isNewsModalOpen = signal(false);
  selectedNews = signal<any | null>(null); // Signal para guardar el objeto de la noticia

  username: string | null = '';
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });

    //Obtener noticias
    this.newsService.getNews();

    //Obtener proyectos
    this.projectsService.getProjects();

    //Obtener proyectos del usuario
    this.projectsService.getProjectsByUser().subscribe();
  }
  openNewsModal(newsItem: any): void {
    this.selectedNews.set(newsItem);
    this.isNewsModalOpen.set(true);
  }
  closeNewsModal(): void {
    this.isNewsModalOpen.set(false);
    this.selectedNews.set(null);
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

  atajos = [
    { label: 'Crear nuevo proyecto', ruta: '/proyectos/new-project' },
    { label: 'Acceder a tutoriales', ruta: '/tutoriales' },
    { label: 'Aprende a usar la impresora', ruta: '/tutoriales/impresion3D' },
    {
      label: 'Precauciones del corte láser',
      ruta: '/tutoriales/cortadoralaser',
    },
  ];
}
