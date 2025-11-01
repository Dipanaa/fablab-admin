import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class FooterComponent {
  @Input() pageName: string = '';
  currentYear = new Date().getFullYear();
}
