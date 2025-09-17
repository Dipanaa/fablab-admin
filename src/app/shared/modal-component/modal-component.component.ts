import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-component',
  imports: [CommonModule],
  templateUrl: './modal-component.component.html',
})
export class ModalComponentComponent { 
  @Input() show = false; 
  @Input() title = 'Título del modal';
  @Input() description = 'Descripción del contenido del modal';
  @Input() acceptText = 'Aceptar';
  @Input() declineText = 'Cancelar';

  @Output() accept = new EventEmitter<void>();
  @Output() decline = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onAccept() {
    this.accept.emit();
    this.show = false;
  }

  onDecline() {
    this.decline.emit();
    this.show = false;
  }

  onClose() {
    this.close.emit();
    this.show = false;
  }
}
