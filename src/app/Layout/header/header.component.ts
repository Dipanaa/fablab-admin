import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
<<<<<<< HEAD
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { map, Subscription, filter } from 'rxjs';
=======
import { routes } from '../../app.routes';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { map, Subscription, finalize, filter } from 'rxjs';
>>>>>>> 55f23e0a56c35e08144c1522653d92388c16d8ea

@Component({
  selector: 'header-main',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any = {};
  //Menu
  toggleMenu = output<boolean>();
  toggleMenuValue = signal<boolean>(true);

  //Ruta actual
  rutaActual = signal<string[]>(['Inicio']);

  //Observara la ruta
  observerRoutes: Subscription | null = null;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.observerRoutes = this.route.events
      .pipe(
        filter((events) => events instanceof NavigationEnd),
        map((route: NavigationEnd) => route.urlAfterRedirects)
      )
      .subscribe((url) => this.rutaActual.set(url.split('/').slice(1)));
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  ngOnDestroy(): void {
    this.observerRoutes?.unsubscribe();
  }

  //Emitir activacion del menu
  toggleMenuActivate() {
    console.log(this.toggleMenuValue(), 'desde el emit');
    if (this.toggleMenuValue()) {
      this.toggleMenu.emit(this.toggleMenuValue());
      this.toggleMenuValue.set(false);
      return;
    }
    this.toggleMenu.emit(this.toggleMenuValue());
    this.toggleMenuValue.set(true);
  }
}
