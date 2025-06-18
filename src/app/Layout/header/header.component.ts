import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'header-main',
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
