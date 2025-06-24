import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  //MenuControllerIntermediario
  menuControllerIntermediary = signal<boolean>(false);


}
