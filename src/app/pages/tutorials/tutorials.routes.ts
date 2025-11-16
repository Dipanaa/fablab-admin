import { Routes } from '@angular/router';
import { TutorialsComponent } from './tutorials.component';
import { PrintTutorials } from './components/print.tutorials/print.tutorials';
import { Cortadoralaser } from './components/cortadoralaser/cortadoralaser';

export const routes: Routes = [
  {
    path: '', // Página principal de tutoriales
    component: TutorialsComponent,
  },
  {
    path: 'impresion3D',
    component: PrintTutorials,
  },
  {
    path: 'cortadoralaser',
    component: Cortadoralaser,
  },
];

export default routes;
