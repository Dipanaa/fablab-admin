import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'status-message',
  imports: [],
  templateUrl: './status-message.component.html',
  styles: ``
})
export class StatusMessageComponent {

  //Atributos
  messageDisplay = input<string>("");
  windowHeight = signal<number>(window.innerHeight-100);

}
