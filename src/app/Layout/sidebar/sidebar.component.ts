import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @ViewChild('navItems') navItems!: ElementRef;

  //Activaacion de Menu
  menuActivate = signal<boolean>(true);

  constructor(private render: Renderer2) {}


  hideContent():void {
    if(this.menuActivate()){
      this.menuActivate.set(false);
      this.render.addClass(this.sideMenu.nativeElement,"w-[100px]");
      this.render.addClass(this.navItems.nativeElement,"translate-x-[-250%]");
      return;
    }

    this.menuActivate.set(true);
    this.render.removeClass(this.sideMenu.nativeElement,"w-[100px]");
    this.render.removeClass(this.navItems.nativeElement,"translate-x-[-250%]");
    console.log(this.navItems.nativeElement);
  }
}
