import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import dblocalusuarios from '../../data/dblocalusuarios.json';
import { UsersInterface } from '../../interfaces/users.interface';
@Component({
  selector: 'users',
  imports: [NgFor],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  listaUsuarios: UsersInterface[] = dblocalusuarios;
}
