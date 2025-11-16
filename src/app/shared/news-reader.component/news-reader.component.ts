import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Asumo que tu interfaz de noticia tiene titulo, contenido, etc.
interface News {
  id: number;
  titulo: string;
  contenido: string;
  autor: string;
  epigrafe: string;
  fechaPublicacion: Date;
}

@Component({
  selector: 'news-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-reader.component.html',
})
export class NewsReaderComponent {
  // Input: Recibe la noticia completa del componente padre.
  @Input() newsItem!: News;

  // Output: Señal para que el padre cierre la vista o el modal.
  @Output() close = new EventEmitter<void>();

  // Usaremos esta función para cerrar la vista
  onClose() {
    this.close.emit();
  }
}
