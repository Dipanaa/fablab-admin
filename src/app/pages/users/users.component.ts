import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { PaginationService } from '../../services/pagination.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'users',
  imports: [ModalComponentComponent, BuscadorComponent, PaginationComponent],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  usersService = inject(UsersService);
  paginationService = inject(PaginationService);
  notificacionStatusService = inject(NotificacionsStatusService);

  constructor() {
    // Effect se encarga de estar atento por si una de las signal dentro de el cambian

    effect(() => {
      // Si 'usuariosBuscados()' cambia, el effect hara 2 cosas:

      // 1. Alimenta al Cerebro(paginationService): Pasa la nueva lista filtrada a PaginationService.
      this.paginationService.setDataList(this.usersService.usuariosBuscados()); // Aqui se ponen los datos que vamos a trabajar a travez del servicio

      // 2. Resetea el Estado: Le pide al cerebro que vuelva a la página 1.
      this.paginationService.goToPage(1);
    });

  // Ejemplos para pruebas
  editarUsuario(id: number, dataUserForm: UsersInterface) {
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
  // Buscador
  // ---------------------------

  onBuscador(termino: string) {
    this.usersService.buscarTermino.set(termino);
  }

  // ---------------------------
  // Modal
  // ---------------------------
  //Abrir modal de confirmacion
  // openModal(mode: 'edit' | 'delete', id: number) {
  //   this.modalMode = mode;
  //   this.isModalOpen = true;
  //   if (this.modalMode == 'edit') {
  //     //Si estamos en modo editar llamamos a la funcion editar del servicio
  //     console.log('Abrimos el modal en modo edicion');
  //     this.usersService.editarUsuario(id);
  //   } else if (this.modalMode === 'delete') {
  //     //Si estamos en modo delete llamamos a la funcion delete del servicio
  //     console.log('Modal en modo eliminacion');
  //     this.usersService.eliminarUsuario(id);
  //   }
  // }

  // //Cerrar modal de confirmacion
  // closeModal() {
  //   this.isModalOpen = false;
  // }

  // manejarAceptar(modalMode: string): void {
  //   if (modalMode === 'edit') {
  //     // Si estamos editando, llamamos a la función de guardado de los cambios
  //     console.log('Aceptamos los cambios en la edicion de usuario');
  //     this.closeModal();
  //   } else if (modalMode === 'delete') {
  //     // Si estamos eliminando, llamamos a la función de eliminación
  //     console.log('Eliminamos el usuario desde el user component');
  //     this.closeModal();
  //   } else {
  //     // Si estamos en modo 'view' o cualquier otro, simplemente cerramos
  //     this.closeModal();
  //   }
  // }
}
