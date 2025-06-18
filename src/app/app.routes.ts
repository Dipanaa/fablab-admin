import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
