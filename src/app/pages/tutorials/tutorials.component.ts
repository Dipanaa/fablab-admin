import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tutorials.component',
  imports: [RouterLink],
  templateUrl: './tutorials.component.html',
})
export class TutorialsComponent {
  tutorialsList = [
    {
      title: 'Impresión 3D: Basico',
      description:
        'Guía completa impresión 3D para principiantes: montaje, nivelación, CURA y primeras impresiones',
      link: 'https://youtu.be/81lBo0dFUnU?si=t7DWot1H7LdwdaCf',
      type: 'video',
    },
    {
      title: 'Corte Láser',
      description:
        'TUTORIAL LaserGRBL desde CERO parte 1 CURSO DESCARGAR e INSTALAR LaserGRBL',
      link: 'https://youtu.be/pJEkUFyFUFE?si=1D7HXoEPdUXU-AJy',
      type: 'video',
    },
    {
      title: 'Introducción a Arduino',
      description: 'Hack Pack - Introducción a Arduino',
      link: 'https://www.youtube.com/watch?v=yi29dbPnu28',
      type: 'video',
    },

    // Manuales

    // 3D Printing
    {
      title: 'Guía Ender 3 v3 S3',
      description: 'Calibración y perfiles FDM.',
      link: 'impresion3D',
      type: 'manual',
    },
    // Laser
    {
      title: 'Seguridad Láser',
      description: 'Protocolos de corte y materiales prohibidos.',
      link: 'cortadoralaser',
      type: 'manual',
    },
  ];

  get manualTutorials() {
    return this.tutorialsList.filter((t) => t.type === 'manual');
  }

  get videoTutorials() {
    return this.tutorialsList.filter((t) => t.type === 'video');
  }
}
