import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { RequestComponent } from './pages/request/request.component';
import { ProjectsTableComponent } from './pages/projects-table/projects-table.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

import { InventoryComponent } from './pages/inventory/inventory.component'
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { isGeneralAuthenticatedGuard } from './guards/isGeneralAuthenticated.guard';
import { UserHomeComponent } from './pages/user-home/user-home.component';
export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canMatch: [NotAuthenticatedGuard]
  },
  {
    path: '',
    canMatch: [isGeneralAuthenticatedGuard],
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
      { path: 'gestion-proyectos', component: ProjectsTableComponent },
      {
        path: 'noticias',
        loadChildren: () =>
          import('./pages/News/news.routes').then((m) => m.default),
      },
      { path: 'solicitudes', component: RequestComponent },
      { path: 'perfil-usuario', component: UserProfileComponent },
      { path: 'inventario', component: InventoryComponent },
      { path: 'home', component: UserHomeComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
