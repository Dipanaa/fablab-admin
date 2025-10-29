import { Component, effect, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PaginationService } from '../../services/pagination.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalEditComponent } from '../../shared/modal-edit/modal-edit.component';
import { Router } from '@angular/router';
import { UsersToApi } from '../../utils/mappers/usersMapper';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';

@Component({
  selector: 'users',
  imports: [
    PaginationComponent,
    ReactiveFormsModule,
    ModalEditComponent,
    BuscadorComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  //Servicios
  usersService = inject(UsersService);
  paginationService = inject(PaginationService);
  notificacionStatusService = inject(NotificacionsStatusService);
  formbuilder = inject(FormBuilder);
  router = inject(Router);

  //Atributos
  modalView = signal<boolean>(false);
  modalId = signal<number>(0);

  //FB en base a WEB API
  fbUser: FormGroup = this.formbuilder.group({
    nombre: ['a'],
    apellido: ['b'],
    email: ['c'],
    rut: ['d'],
    carrera: ['e'],
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
  //Todo: Investigar implementacion de genericos
  dataFormPut(data: any): void {
    if (!data) {
      return;
    }

    //Mapeamos la data a la respuesta
    const dataRequest = UsersToApi(data);

    this.usersService
      .editarUsuario(this.modalId(), dataRequest)
      .subscribe((status) => {
        if (status) {
          this.router.navigateByUrl('/usuarios');
          return;
        }
      });
  }

  //Abre modal de edicion y coloca valores de usuario.
  modalEditView(id: number) {
    this.modalId.set(id);
    const userFind = this.usersService.searchUserForId(id);
    //Todo: crear mapper de vuelta
    this.fbUser.patchValue(userFind!);
    !this.modalView() ? this.modalView.set(true) : this.modalView.set(false);
  }

  modalDeleteView() {
    console.log('Hola nerd');
  }
}
