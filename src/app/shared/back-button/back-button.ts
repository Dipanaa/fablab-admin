import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'back-button',
  standalone: true,
  templateUrl: './back-button.html',
})
export class BackButtonComponent {
  private location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
