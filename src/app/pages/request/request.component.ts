import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'request',
  imports: [CommonModule],
  templateUrl: './request.component.html',
})
export class RequestComponent {
  // Lista simulada de solicitudes
  solicitudes = [
    {
      id: 1,
      rut: '12.345.678-9',
      nombre: 'Julian Pérez',
      email: 'julian@example.com',
      tipo: 'Ingreso',
      estado: 'Pendiente',
      fecha: new Date('2025-08-25'),
    },
    {
      id: 2,
      rut: '9.876.543-2',
      nombre: 'María González',
      email: 'maria@example.com',
      tipo: 'Creación',
      estado: 'Pendiente',
      fecha: new Date('2025-08-26'),
    },
    {
      id: 3,
      rut: '15.432.678-1',
      nombre: 'Pedro López',
      email: 'pedro@example.com',
      tipo: 'Eliminación',
      estado: 'Pendiente',
      fecha: new Date('2025-08-27'),
    }
  ];





  



















  // Aceptar solicitud
  aceptarSolicitud(id: number) {
    const solicitud = this.solicitudes.find(s => s.id === id);
    if (solicitud) solicitud.estado = 'Aceptada';
  }

  // Rechazar solicitud
  rechazarSolicitud(id: number) {
    const solicitud = this.solicitudes.find(s => s.id === id);
    if (solicitud) solicitud.estado = 'Rechazada';
  }
}
