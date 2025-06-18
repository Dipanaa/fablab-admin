import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AllUsersComponent } from '../pages/Users/all-users/all-users.component';
import { AllProjectsComponent } from '../pages/Projects/Pages/all-projects/all-projects.component';
import { CardComponent } from '../pages/Projects/components/card/card.component';
import { RouterOutlet } from '@angular/router';
import { IndividualProjectComponent } from '../pages/Projects/Pages/individual-project/individual-project.component';

@Component({
  selector: 'app-layout',
  imports: [AllProjectsComponent, RouterOutlet, AllUsersComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('sideMenu') sideMenu!: ElementRef;

  constructor(private render: Renderer2) {}

  ngAfterViewInit(): void {
    console.log(this.sideMenu);
  }

  hideContent() {
    this.render.setStyle(
      this.sideMenu.nativeElement,
      'transform',
      'translateX(-100%)'
    );
  }
}
