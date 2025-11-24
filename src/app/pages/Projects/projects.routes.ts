import { Routes } from '@angular/router';
import { IndividualProjectComponent } from './Pages/individual-project/individual-project.component';
import { AllProjectsComponent } from './Pages/all-projects/all-projects.component';
import { NewProjectComponent } from './Pages/new-project/new-project.component';
import { ProjectUpdateComponent } from './Pages/project-update/project-update.component';
import { EditProjectComponent } from './Pages/edit-project/edit-project.component';

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
    path: ':id',
    component: IndividualProjectComponent,
  },
  {
    path: 'edit-project/:id',
    component: EditProjectComponent,
  },
];

export default routes;
