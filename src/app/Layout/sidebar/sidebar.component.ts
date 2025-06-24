import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @ViewChild('navItems') navItems!: ElementRef;

  //Activaacion de Menu
  menuActivate = input<boolean>(false);

  observadorMenuChanges$?: Observable<boolean>;
  menuControllerObservable$?: Subscription;


  constructor(private render: Renderer2) {
    this.observadorMenuChanges$ = toObservable(this.menuActivate);
  }

  ngAfterViewInit(): void {
    this.menuControllerObservable$ = this.observadorMenuChanges$!.subscribe((valor)=>{
      console.log(valor,"desde el observable");
      this.hideContent(valor);
    });

  }


  hideContent(valor:boolean):void {
    console.log(this.menuActivate(),"desde esconder el menu");
    if(valor){
      this.render.addClass(this.sideMenu.nativeElement,"w-[0px]");
      this.render.addClass(this.navItems.nativeElement,"translate-x-[-100%]");
      return;
    }

    this.render.removeClass(this.sideMenu.nativeElement,"w-[0px]");
    this.render.removeClass(this.navItems.nativeElement,"translate-x-[-100%]");
  }
}
