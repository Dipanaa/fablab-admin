import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent {
  @Input() code: string = 'Error';
  @Input() title: string = 'Ha ocurrido un error';
  @Input() message: string = 'Algo salió mal. Intenta nuevamente.';
}
