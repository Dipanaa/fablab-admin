import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { PaginationService } from '../../services/pagination.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { UsersInterface } from '../../interfaces/users.interface';
import { ModalEditionComponent } from '../../shared/modal-edition/modal-edition.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'users',
  imports: [BuscadorComponent, PaginationComponent, ModalEditionComponent],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  // ---------------------------
  // Injecciones
  // ---------------------------
  usersService = inject(UsersService);
  paginationService = inject(PaginationService);
  notificacionStatusService = inject(NotificacionsStatusService);
  fb = inject(FormBuilder);

  // ---------------------------
  // Constructor
  // ---------------------------
  constructor() {
    // Effect se encarga de estar atento por si una de las signal dentro de el cambian

    effect(() => {
      // Si 'usuariosBuscados()' cambia, el effect hara 2 cosas:

      // 1. Alimenta al Cerebro(paginationService): Pasa la nueva lista filtrada a PaginationService.
      this.paginationService.setDataList(this.usersService.usuariosBuscados()); // Aqui se ponen los datos que vamos a trabajar a travez del servicio

      // 2. Resetea el Estado: Le pide al cerebro que vuelva a la página 1.
      this.paginationService.goToPage(1);
    });
  }

  // ---------------------------
  // Signals
  // ---------------------------

  isEditModalOpen = signal(false);
  selectedUser = signal<UsersInterface | null>(null);

  // ---------------------------
  // Buscador
  // ---------------------------

  onBuscador(termino: string) {
    this.usersService.buscarTermino.set(termino);
  }

  // ---------------------------
  // Modal
  // ---------------------------
  openEditModal(user: UsersInterface): void {
    // 1. Guardamos el objeto completo de la fila en la Signal
    this.selectedUser.set(user);
    // 2. Abrimos el modal
    this.isEditModalOpen.set(true);
  }

  closeEditModal(): void {
    this.selectedUser.set(null); // Limpiamos la selección
    this.isEditModalOpen.set(false);
  }

  handleUserUpdate(updatedUser: UsersInterface): void {
    console.log('Datos listos para enviar al API:', updatedUser);
    this.closeEditModal(); // Cerramos el modal
  }

  // ---------------------------
  // Formulario
  // ---------------------------
  userForm = this.fb.group({
    nombre: [''],
    apellido: [''],
    rut: [''],
    carrera: [''],
    email: ['', [Validators.required, Validators.email]],
    rol: [''],
  });
}
