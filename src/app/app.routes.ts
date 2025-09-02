import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { AllProjectsComponent } from './pages/Projects/Pages/all-projects/all-projects.component';
import { NewsComponent } from './pages/News/News.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { RequestComponent } from './pages/request/request.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsTableComponent } from './pages/projects-table/projects-table.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'layout', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: DashboardComponent },
      {
        path: 'proyectos',
        loadChildren: () =>
          import('./pages/Projects/projects.routes').then((m) => m.default),
      },
      { path: 'usuarios', component: UsersComponent },
      { path: 'projects-table', component: ProjectsTableComponent },
      {
        path: 'noticias',
        loadChildren: () =>
          import('./pages/News/news.routes').then((m) => m.default),
      },
      { path: 'solicitudes', component: RequestComponent },
      { path: 'user-profile', component: UserProfileComponent },
    ],
  },
];
