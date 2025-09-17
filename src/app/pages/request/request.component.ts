import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentComponent } from "../../shared/modal-component/modal-component.component";

@Component({
  selector: 'request',
  imports: [CommonModule, ModalComponentComponent],
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
      titulo: 'Solicitud de ingreso al laboratorio',
      descripcion: 'Julian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratoriJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de innovación para colaborar en proyectos futurosJulian Pérez solicita unirse al laboratorio de.'
    },
    {
      id: 2,
      rut: '9.876.543-2',
      nombre: 'María González',
      email: 'maria@example.com',
      tipo: 'Creación',
      estado: 'Pendiente',
      fecha: new Date('2025-08-26'),
      titulo: 'Solicitud de creación de proyecto',
      descripcion: 'María González solicita la creación del proyecto "EcoTech", enfocado en energías renovables.'
    },
    {
      id: 3,
      rut: '15.432.678-1',
      nombre: 'Pedro López',
      email: 'pedro@example.com',
      tipo: 'Eliminación',
      estado: 'Pendiente',
      fecha: new Date('2025-08-27'),
      titulo: 'Solicitud de eliminación de proyecto',
      descripcion: 'Pedro López solicita la eliminación del proyecto "SmartHome", dado que ya no cuenta con financiamiento.'
    }
  ];

  isModalOpen = false;
  selectedSolicitud: any = null;

  openModal(solicitud: any) {
    this.selectedSolicitud = solicitud;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedSolicitud = null;
  }

  // Aceptar solicitud
  aceptarSolicitud(id: number) {
    const solicitud = this.solicitudes.find(s => s.id === id);
    if (solicitud) solicitud.estado = 'Aceptada';
    this.closeModal();
  }

  // Rechazar solicitud
  rechazarSolicitud(id: number) {
    const solicitud = this.solicitudes.find(s => s.id === id);
    if (solicitud) solicitud.estado = 'Rechazada';
    this.closeModal();
  }
}
