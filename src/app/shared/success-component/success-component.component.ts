import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'success-component',
  imports: [RouterLink],
  templateUrl: './success-component.component.html',
})
export class SuccessComponent {
  //Para que sea reutilizable
  urlName = input<string>("");

  //TODO: Convertir en enum con opciones o dic de llave o valor etc
  tipoDePeticion = input<string>("");

}
