import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-component',
  imports: [CommonModule],
  templateUrl: './modal-component.component.html',
})
export class ModalComponentComponent {
  //Atributos

  //Parametros de entrada
  @Input() show = false;
  @Input() title = 'Título del modal';
  @Input() description = 'Descripción del contenido del modal';
  @Input() acceptText = 'Aceptar';
  @Input() declineText = 'Cancelar';

  //Parametros de salida
  @Output() accept = new EventEmitter<void>();
  @Output() decline = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();



  onAccept() {
    this.accept.emit();
  }

  onDecline() {
    // Si no hay texto de rechazo, asumimos que no hay botón.
    if (this.declineText) {
      this.decline.emit();
    }
  }

  onClose() {
    this.close.emit();
  }
}
