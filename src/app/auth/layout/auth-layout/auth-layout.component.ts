import { Component, input, signal } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register/register.component';

@Component({
  selector: 'auth-layout',
  imports: [LoginComponent,RegisterComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {

  //Toggle modo de ingreso
  isLoginView = signal<boolean>(true);

}
