import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersInterface } from '../../interfaces/users.interface';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';

@Component({
  selector: 'users',
  imports: [],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  usersService = inject(UsersService);
  notificacionStatusService = inject(NotificacionsStatusService);

  paginaActual = signal<number>(1);
  usuariosPorPagina: number = 5;








  //TODO: Injectar router, crear formulario de actualizacion
  // Ejemplos para pruebas
  editarUsuario(id: number, dataUserForm: UsersInterface) {

    //TODO: Validacion de formulario

    this.usersService.editarUsuario(id,dataUserForm).subscribe(
      (status) => {
        if(status){
          this.notificacionStatusService.showMessage();
          return;
        }
      }
    );
  }






  eliminarUsuario(id: number) {
    this.usersService.eliminarUsuario(id);
  }

  // ---------------------------
  // Paginacion
  // ---------------------------
  totalPages(): number {
    const totalUsuarios = this.usersService.usuariosBuscados().length;
    return Math.ceil(totalUsuarios / this.usuariosPorPagina); // total / 5
  }

  usuariosPaginados() {
    //Obtenemos la lista completa de usuarios
    const listaCompleta = this.usersService.usuariosBuscados();

    // Calculamos el inicio y fin del pedaso que se mostrara
    const start = (this.paginaActual() - 1) * this.usuariosPorPagina;
    const end = start + this.usuariosPorPagina;

    // Devolvemos solo la porción de la página actual
    return listaCompleta.slice(start, end);
  }

  paginasCompactas(): number[] {
    const total = this.totalPages();
    const actual = this.paginaActual();
    const delta = 2; // Cuántos botones antes y después del actual

    const range: number[] = [];

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= actual - delta && i <= actual + delta)
      ) {
        range.push(i);
      }
    }

    // Insertar puntos suspensivos donde haya saltos
    const compact: number[] = [];
    let prev = 0;
    for (let num of range) {
      if (prev && num - prev > 1) {
        compact.push(-1); // -1 representará "..."
      }
      compact.push(num);
      prev = num;
    }

    return compact;
  }

  irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPages()) {
      this.paginaActual.set(pagina);
    }
  }
}
