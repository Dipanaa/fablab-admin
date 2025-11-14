import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsValidations } from '../../utils/FormsValidations/CustomValidations';

@Component({
  selector: 'modal-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-edit.component.html',
  styles: ``,
})
export class ModalEditComponent {
  //Servicios
  FormBuilder = inject(FormBuilder);
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  fbEdit = input<FormGroup>();
  fbEditSend = output<FormGroup>();
  closeModal = output<boolean>();
  modalTitle = input<string>('Editar Elemento');
  loading = input<boolean>(false);

  //Metodos

  //Emision de formularios
  emitForm(): void {
    //Envio de datos
    this.fbEditSend.emit(this.fbEdit()?.value);

  }

  //Llaves de form
  formKeys(fb: FormGroup): Array<String> {
    return Object.keys(fb.controls);
  }

  //Todo: crear boton de cerrar, emitir valor false
}
