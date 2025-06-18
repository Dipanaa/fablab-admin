import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'all-users',
  imports: [],
  templateUrl: './all-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllUsersComponent {}
