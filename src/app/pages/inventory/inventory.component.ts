import { CommonModule} from '@angular/common';
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
    { id: 3, nombre: 'Tarjetas plasticas', categoria: 'Laser', stock: 100, stockMin: 20, ubicacion: 'Cajon A2', descripcion: 'Tarjetas de plastico en blanco para grabado laser' },
  ];

  isModalOpen = false;
  selectedProducto: any = null;
  modalMode: 'view' | 'edit' | 'delete' = 'view';

  // Abrir modal
  openModal(producto: any, mode: 'view' | 'edit' | 'delete' = 'view') {
    this.selectedProducto = { ...producto }; // copia para edición
    this.modalMode = mode;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProducto = null;
  }

  // Guardar cambios (Editar)
  editarProducto() {
    const index = this.productos.findIndex(p => p.id === this.selectedProducto.id);
    if (index !== -1) {
      this.productos[index] = { ...this.selectedProducto };
    }
    this.closeModal();
  }

  // Eliminar producto
  eliminarProducto() {
    this.productos = this.productos.filter(p => p.id !== this.selectedProducto.id);
    this.closeModal();
  }

  // KPIs
  get totalProductos() {
    return this.productos.length;
  }

  get bajoStock() {
    return this.productos.filter(p => p.stock <= p.stockMin).length;
  }
}
