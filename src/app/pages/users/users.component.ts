import { Component, effect, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PaginationService } from '../../services/pagination.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalEditComponent } from '../../shared/modal-edit/modal-edit.component';
import { UsersToApi } from '../../utils/mappers/usersMapper';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { RouterLinkActive } from "@angular/router";
import { UsersInterface } from '../../interfaces/users.interface';
import { CustomFormsValidations } from '../../utils/FormsValidations/CustomValidations';

@Component({
  selector: 'users',
  imports: [
    PaginationComponent,
    ReactiveFormsModule,
    ModalEditComponent,
    BuscadorComponent,
    StatusMessageComponent,
    ModalComponentComponent,
],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  //Servicios
  usersService = inject(UsersService);
  paginationService = inject(PaginationService);
  notificationStatusService = inject(NotificacionsStatusService);
  formbuilder = inject(FormBuilder);
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  openEditView = signal<boolean>(false);
  openDeleteView = signal<boolean>(false);
  modalIdUser = signal<number | undefined>(0);
  loading = signal<boolean>(false);

  //FB en base a WEB API
  fbUser: FormGroup = this.formbuilder.group({
    nombre: ['',[Validators.required,Validators.minLength(5)]],
    apellido: ['',[Validators.required,Validators.minLength(5)]],
    email: ['',[Validators.required]],
    rut: ['',[Validators.required]],
    carrera: ['',[Validators.required]],
  });

  constructor() {
    effect(() => {
      //Alimenta (paginationService): Pasa la nueva lista filtrada a PaginationService.
      this.paginationService.setDataList(
        this.usersService.searchUserByFilter()
      ); // Aqui se ponen los datos que vamos a trabajar a travez del servicio

      //Resetea el Estado: Le pide al cerebro que vuelva a la página 1.
      this.paginationService.goToPage(1);
    });
  }

  //Metodos
  //Todo: Investigar implementacion de genericos
  dataFormPut(data: FormGroup): void {

    //Parseamos de vuelta el valor al formulario original
    this.fbUser.patchValue(data);

    if (!data || this.loading() || this.fbUser.invalid) {
      return;
    }

    this.loading.set(true);

    //Mapeamos la data a la respuesta
    const dataRequest = UsersToApi(this.fbUser.value);

    this.usersService
    .putUsers(this.modalIdUser()!, dataRequest)
    .subscribe((status) => {
      if (status) {
        this.usersService.dataUsersResource.reload();
        this.notificationStatusService.showMessage();
        this.openEditView.set(false);
        this.loading.set(false);
        return;
      }
      this.usersService.dataUsersResource.reload();
      this.notificationStatusService.showMessage();
      this.openEditView.set(false);
      this.loading.set(false);
    });
  }

  deleteUser() {
    if (!this.modalIdUser() || this.loading()) {
      return;
    }

    this.loading.set(true);


    this.usersService.deleteUsers(this.modalIdUser()!).subscribe((status) => {
      if (status) {
        this.usersService.dataUsersResource.reload();
        this.notificationStatusService.showMessage();
        this.loading.set(false);
        this.openDeleteView.set(false);
        return;
      }
      this.usersService.dataUsersResource.reload();
      this.notificationStatusService.showMessage();
      this.loading.set(false);
      this.openDeleteView.set(false);
    });
  }

  //Abre modal de edicion y coloca valores de usuario.
  modalEditView(id: number) {
    this.modalIdUser.set(id);
    const userFind = this.usersService.searchUserForId(id);
    this.fbUser.patchValue(userFind!);
    this.openEditView.set(true);
  }

  modalDeleteView(id: number) {
    this.modalIdUser.set(id);
    this.openDeleteView.set(true);
  }
}
