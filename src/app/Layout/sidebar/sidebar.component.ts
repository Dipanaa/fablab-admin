import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements AfterViewInit {

  //Inyeccion servicios
  render = inject(Renderer2)
  authService = inject(AuthService);


  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @ViewChild('navItems') navItems!: ElementRef;

  //Activacion de Menu
  menuActivate = input<boolean>(false);


  //Ocultar o mostrar sidebar con observable
  observadorMenuChanges$?: Observable<boolean>;
  menuControllerObservable$?: Subscription;


  constructor() {
    this.observadorMenuChanges$ = toObservable(this.menuActivate);
  }

  ngAfterViewInit(): void {
    this.menuControllerObservable$ = this.observadorMenuChanges$!.subscribe((valor)=>{
      this.hideContent(valor);
    });

  }


  hideContent(valor:boolean):void {
    if(valor){
      this.render.addClass(this.sideMenu.nativeElement,"w-[0px]");
      this.render.addClass(this.navItems.nativeElement,"translate-x-[-100%]");
      return;
    }

    this.render.removeClass(this.sideMenu.nativeElement,"w-[0px]");
    this.render.removeClass(this.navItems.nativeElement,"translate-x-[-100%]");
  }
}
