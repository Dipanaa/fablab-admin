import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
})
export class CardComponent {
  projectId = input.required<number>();
  title = input.required<string>();
  description = input<string>('');
  imgUrl = input<string>('');

  // Estos son los que usamos en el HTML
  category = input<string>('');
  date = input<string>('');
}
