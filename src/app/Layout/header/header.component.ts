import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

@Component({
  selector: 'header-main',
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  toggleMenu = output<boolean>();
  toggleMenuValue = signal<boolean>(true);


  //Emitir activacion del menu
  toggleMenuActivate(){
    console.log(this.toggleMenuValue(),"desde el emit");
    if(this.toggleMenuValue()){
      this.toggleMenu.emit(this.toggleMenuValue());
      this.toggleMenuValue.set(false)
      return;
    }
    this.toggleMenu.emit(this.toggleMenuValue());
    this.toggleMenuValue.set(true);
  }
}
