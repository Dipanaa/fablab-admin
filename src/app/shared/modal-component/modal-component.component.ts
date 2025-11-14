import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-component',
  imports: [CommonModule],
  templateUrl: './modal-component.component.html',
})
export class ModalComponentComponent {
  //Atributos

  //Parametros de entrada
  @Input() show = false; //Permite la apertura del modal
  @Input() title = 'Título del modal';
  @Input() description = 'Descripción del contenido del modal';
  @Input() acceptText = 'Aceptar';
  @Input() declineText = 'Cancelar';
  loading = input<boolean>(false);


  //Parametros de salida
  @Output() accept = new EventEmitter<void>();
  decline = output<boolean>();
  close = output<boolean>();

  onAccept() {
    this.accept.emit();
  }

  onDecline() {
    // Si no hay texto de rechazo, asumimos que no hay botón.
    if (this.declineText) {
      this.decline.emit(false );
    }
  }

  onClose() {
    this.close.emit(false);
  }
}
