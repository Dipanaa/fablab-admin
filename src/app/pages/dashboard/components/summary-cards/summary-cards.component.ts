import { ChangeDetectionStrategy, Component } from '@angular/core';

import dblocalusuarios from '../../../../data/dblocalusuarios.json';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { UsersInterface } from '../../../../interfaces/users.interface';
import { RouterLink } from '@angular/router';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';

@Component({
  selector: 'summary-cards',
  imports: [RouterLink],
  templateUrl: './summary-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryCardsComponent {
  listaUsuarios: UsersInterface[] = dblocalusuarios;
  proyectos: ProjectsInterface[] = dblocalproyectos;
}
