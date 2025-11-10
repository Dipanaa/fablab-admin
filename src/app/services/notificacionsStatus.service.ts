import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificacionsStatusService {
  //Atributos
  statusTextMessage = signal<string>('');
  statusErrorMessage = signal<string>('');
  statusMessage = signal<boolean>(false);
  timerId: any | null = null;

  //Mostrar mensaje para cambiar estado y limpiar mensaje anterior
  showMessage(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.statusMessage.set(false);
      this.statusTextMessage.set('');
      this.timerId = null;
    }, 3000);
  }
}
