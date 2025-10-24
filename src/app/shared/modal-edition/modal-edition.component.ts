import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-edition',
  imports: [CommonModule],
  templateUrl: './modal-edition.component.html',
})
export class ModalEditionComponent {
  @Input() show = false;
  @Input() title = 'Editar Elemento';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
