import { Routes } from '@angular/router';
import { IndividualProjectComponent } from './Pages/individual-project/individual-project.component';
import { AllProjectsComponent } from './Pages/all-projects/all-projects.component';
import { NewProjectComponent } from './Pages/new-project/new-project.component';
import { ProjectUpdateComponent } from './Pages/project-update/project-update.component';
import { Error404Component } from '../error404/error404.component';

export const routes: Routes = [
  {
    path: '', // Página principal de proyectos
    component: AllProjectsComponent,
  },
  {
    path: 'new-project', // Formulario para crear un nuevo proyecto
    component: NewProjectComponent,
  },
  {
    path: 'project-update/:id',
    component: ProjectUpdateComponent,
  },
  {
    path: ':id', // Vista individual de un proyecto, ej: /123
    component: IndividualProjectComponent,
  },
  {
    path: '**',
    component: Error404Component, // Redirección por defecto
  },
];

export default routes;
