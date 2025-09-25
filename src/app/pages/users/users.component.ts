import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import dblocalusuarios from '../../data/dblocalusuarios.json';
import { UsersService } from '../../services/users.service';



@Component({
  selector: 'users',
  imports: [NgFor],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {

  usersService = inject(UsersService);
  listaUsuarios: any[] = dblocalusuarios;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor() {
    // Llamada de prueba al iniciar
    this.usersService.obtenerUsuarios();
    console.log(this.usersService.usuariosData());
  }

  // Ejemplos para pruebas
  editarUsuario(id: number) {
    this.usersService.editarUsuario(id);
  }

  eliminarUsuario(id: number) {
    this.usersService.eliminarUsuario(id);
  }

  // ---------------------------
  // Paginacion
  // ---------------------------

  //Esto esta hardcodeado!!!!!!!!!!!!!!!!!!!
  totalPages(): number {

    return Math.ceil(this.listaUsuarios.length / this.itemsPerPage);
  }

  usuariosPaginados() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.listaUsuarios.slice(start, start + this.itemsPerPage);
  }

  paginasCompactas(): number[] {
    const total = this.totalPages();
    const actual = this.currentPage;
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
      this.currentPage = pagina;
    }
  }
}
