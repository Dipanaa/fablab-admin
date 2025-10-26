import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'modal-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-edit.component.html',
  styles: ``,
})
export class ModalEditComponent implements OnInit {
  //Servicios
  FormBuilder = inject(FormBuilder);

  //Atributos
  fbEdit = input<FormGroup>();
  fbEditSend = output<FormGroup>();
  closeModal = output<boolean>();
  modalTitle = input<string>('Editar Elemento');

  ngOnInit() {
    console.log(this.fbEdit()?.value);
  }

  //Metodos

  //Emision de formularios
  emitForm(): void {
    //Clg de prueba para ver los datos
    const formData = this.fbEdit()?.value;
    console.log('Data lista para emitir:', formData);

    //Envio de datos
    this.fbEditSend.emit(this.fbEdit()?.value);
    console.log(this.fbEdit);

    //Reseteo del modal y cerrado (Falta el loader antes de esto)
    this.fbEdit()?.reset();
    this.closeModal.emit(false);
  }

  //Llaves de form
  formKeys(fb: FormGroup): Array<String> {
    return Object.keys(fb.controls);
  }

  //Todo: crear boton de cerrar, emitir valor false
}
