import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PaginationService } from '../../services/pagination.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalEditComponent } from '../../shared/modal-edit/modal-edit.component';

@Component({
  selector: 'users',
  imports: [PaginationComponent, ReactiveFormsModule, ModalEditComponent],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  //Servicios
  usersService = inject(UsersService);
  paginationService = inject(PaginationService);
  notificacionStatusService = inject(NotificacionsStatusService);
  formbuilder = inject(FormBuilder);

  //Atributos
  modalView = signal<boolean>(false);
  modalId = signal<number>(0);

  fbUser: FormGroup = this.formbuilder.group({
    Nombre: [''],
    Apellido: [''],
    Correo: [''],
    Rut: [''],
    Carrera: [''],
    Rol: [''],
  });

  constructor() {
    effect(() => {
      //Alimenta (paginationService): Pasa la nueva lista filtrada a PaginationService.
      this.paginationService.setDataList(this.usersService.usuariosBuscados()); // Aqui se ponen los datos que vamos a trabajar a travez del servicio

      //Resetea el Estado: Le pide al cerebro que vuelva a la página 1.
      this.paginationService.goToPage(1);
    });
    console.log(this.usersService.usuariosData());
  }

  //Metodos
  dataForm(data: Object) {
    console.log(data);
  }

  modalEditView(id: number) {
    this.modalId.set(id);
    !this.modalView() ? this.modalView.set(true) : this.modalView.set(false);
  }

  modalDeleteView() {
    console.log('Hola nerd');
  }
}
