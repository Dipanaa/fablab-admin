import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { RequestComponent } from './pages/request/request.component';
import { ProjectsTableComponent } from './pages/projects-table/projects-table.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { isGeneralAuthenticatedGuard } from './guards/isGeneralAuthenticated.guard';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { newItemInventariComponent } from './pages/inventory/components/new-item-inventory.component/new-item-inventory.component';
import { adminGuardRouteGuard } from './guards/adminGuardRoute.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canMatch: [NotAuthenticatedGuard],
  },
  {
    path: '',
    canMatch: [isGeneralAuthenticatedGuard],
    component: LayoutComponent,
    children: [
      { path: 'layout', redirectTo: 'inicio'},
      { path: 'inicio', component: UserHomeComponent },
      { path: 'metricas', component: DashboardComponent,canMatch: [adminGuardRouteGuard] },
      { path: 'perfil-usuario', component: UserProfileComponent },
      {
        path: 'proyectos',
        loadChildren: () =>
          import('./pages/Projects/projects.routes').then((m) => m.default),
      },
      { path: 'gestion-proyectos', component: ProjectsTableComponent,canMatch: [adminGuardRouteGuard], },
      { path: 'usuarios', component: UsersComponent,canMatch: [adminGuardRouteGuard], },
      { path: 'solicitudes', component: RequestComponent,canMatch: [adminGuardRouteGuard], },
      { path: 'inventario', component: InventoryComponent,canMatch: [adminGuardRouteGuard], },
      {
        path: 'inventario/nuevo',
        component: newItemInventariComponent,
      },
      {
        path: 'noticias',
        canMatch: [adminGuardRouteGuard],
        loadChildren: () =>
          import('./pages/News/news.routes').then((m) => m.default),
      },
      {
        path: 'tutoriales',
        loadChildren: () =>
          import('./pages/tutorials/tutorials.routes').then((m) => m.default),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
