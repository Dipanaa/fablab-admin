import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'inventory',
  imports: [CommonModule, ModalComponentComponent, FormsModule],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  productos = [
    { id: 1, nombre: 'PLA Rojo', categoria: 'Filamento', stock: 5, stockMin: 3, ubicacion: 'Estante A', descripcion: 'Carrete de filamento PLA rojo de 1kg.' },
    { id: 2, nombre: 'PLA Negro', categoria: 'Filamento', stock: 1, stockMin: 3, ubicacion: 'Estante A', descripcion: 'Carrete de filamento PLA negro de 1kg.' },
    { id: 3, nombre: 'Tarjetas plásticas', categoria: 'Laser', stock: 100, stockMin: 20, ubicacion: 'Cajón A2', descripcion: 'Tarjetas de plástico en blanco para grabado láser.' },
  ];

  isModalOpen = false;
  selectedProducto: any = null;
  modalMode: 'view' | 'edit' | 'delete' = 'view';

  // ---------- Modal ----------
  openModal(producto: any, mode: 'view' | 'edit' | 'delete' = 'view') {
    this.selectedProducto = { ...producto }; // copiamos para evitar modificar directo
    this.modalMode = mode;
    this.isModalOpen = true;
    console.log(`Modal abierto en modo: ${mode}`, this.selectedProducto);
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProducto = null;
    console.log('Modal cerrado');
  }

  // ---------- Acciones ----------
  editarProducto() {
    console.log("Guardar cambios de producto:", this.selectedProducto);
    // Aquí deberíamos hacer una peticion para actualizar, creo que se llama pull
    // Por ahora solo cerramos el modal
    this.closeModal();
  }

  cancelarEdicion() {
    console.log("Edición cancelada para:", this.selectedProducto);
    // No se guarda nada, solo cerramos, diego ayuda
    this.closeModal();
  }

  eliminarProducto() {
    console.log("Eliminar producto:", this.selectedProducto);
    // Aquí deberíamos llamar al servicio/API para eliminar el producto
    // Por ahora solo cerramos el modal
    this.closeModal();
  }

  // ---------- Indicadores ----------
  get totalProductos() {
    return this.productos.length;
  }

  get bajoStock() {
    // Devolver cuántos productos están en o por debajo de su stock mínimo
    return this.productos.filter(p => p.stock <= p.stockMin).length;
  }
}
