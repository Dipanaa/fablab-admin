import { Routes } from '@angular/router';
import { IndividualProjectComponent } from './Pages/individual-project/individual-project.component';
import { AllProjectsComponent } from './Pages/all-projects/all-projects.component';

export const routes: Routes = [
  {
    path: '',
    component: AllProjectsComponent,
  },
  {
    path: ':id',
    component: IndividualProjectComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default routes;
