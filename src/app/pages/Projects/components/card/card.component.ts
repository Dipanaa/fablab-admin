import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
})
export class CardComponent {
  cardID = input<string>('');
  title = input<string>('');
  description = input<string>('');
  imgUrl = input<string>('');
}
