import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { InventoryService } from '../../services/inventory.service';
import { PaginationService } from '../../services/pagination.service';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';

import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { ModalEditComponent } from '../../shared/modal-edit/modal-edit.component';
import { FooterComponent } from '../../shared/footer/footer';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { InventoryInterface } from '../../interfaces/inventory.interface';

const STOCK_MIN_LIMIT = 5;

@Component({
  selector: 'inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BuscadorComponent,
    PaginationComponent,
    ModalEditComponent,
    ModalComponentComponent,
    StatusMessageComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  paginationService = inject(PaginationService);
  formbuilder = inject(FormBuilder);
  inventoryService = inject(InventoryService);
  notificacionsStatusService = inject(NotificacionsStatusService);

  modalView = signal<boolean>(false);
  modalDelete = signal<boolean>(false);
  modalId = signal<number>(0);
  loading = signal<boolean>(false);

  searchTerm = signal<string>('');
  filterState = signal<'ALL' | 'LOW' | 'ZERO'>('ALL');

  itemsCeroStockCount: number = 0;
  bajoStockCount: number = 0;
  totalInsumosCount: number = 0;

  fbInventory: FormGroup = this.formbuilder.group({
    nombre: [''],
    categoria: [''],
    stock: [''],
    ubicacion: [''],
    descripcion: [''],
    estado: [''],
    id: [''],
  });

  public filteredInventory = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const filter = this.filterState();
    let items = this.inventoryService.inventoryData();

    if (filter === 'LOW') {
      items = items.filter(
        (item) => item.stock > 0 && item.stock <= STOCK_MIN_LIMIT
      );
    } else if (filter === 'ZERO') {
      items = items.filter((item) => item.stock === 0);
    }

    if (term) {
      items = items.filter(
        (item) =>
          item.nombre.toLowerCase().includes(term) ||
          item.categoria.toLowerCase().includes(term) ||
          item.ubicacion.toLowerCase().includes(term)
      );
    }

    return items;
  });

  constructor() {
    this.inventoryService.getInventoryItems().subscribe(() => {
      this.calcularMetricasYAnimar();
    });

    effect(() => {
      const inventoryList = this.filteredInventory();
      this.paginationService.setDataList(inventoryList);
      this.paginationService.goToPage(1);
    });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
  }

  totalFilter() {
    this.filterState.set('ALL');
  }

  bajoStockFilter() {
    this.filterState.set('LOW');
  }

  ceroStockFilter() {
    this.filterState.set('ZERO');
  }

  openModalEditView(id: number) {
    this.modalId.set(id);
    const itemFound = this.inventoryService
      .inventoryData()
      .find((p) => p.id === id);

    if (itemFound) {
      this.fbInventory.patchValue(itemFound);
      this.modalView.set(true);
    }
  }

  openModalDeleteView(id: number) {
    this.modalId.set(id);
    this.modalDelete.set(true);
  }

  dataFormPut(data: FormGroup) {
    if (!data || this.loading() || !this.modalId()) {
      return;
    }

    this.loading.set(true);

    const updatedItem = { ...this.fbInventory.value, ...data };

    this.inventoryService
      .putInventoryitem(updatedItem, this.modalId()) // Asumiendo que el método en servicio es putInventoryItem o similar
      .subscribe((status) => {
        this.loading.set(false);
        if (status) {
          this.notificacionsStatusService.showMessage();
          this.inventoryService.inventoryResource.reload();
          this.modalView.set(false);
        } else {
          this.modalView.set(false);
        }
      });
  }

  dataFormDelete() {
    if (this.loading() || !this.modalId()) {
      return;
    }

    this.loading.set(true);

    this.inventoryService
      .deleteInventoryitem(this.modalId())
      .subscribe((status) => {
        this.loading.set(false);
        if (status) {
          this.notificacionsStatusService.showMessage();
          this.inventoryService.inventoryResource.reload();
          this.modalDelete.set(false);
          this.inventoryService.getInventoryItems().subscribe(() => {
            this.loading.set(false);
            this.calcularMetricasYAnimar();
          });
        } else {
          this.loading.set(false);
          this.modalDelete.set(false);
        }
      });
  }

  calcularMetricasYAnimar() {
    const data = this.inventoryService.inventoryData();
    const total = data.length;
    const ceroStock = data.filter((p) => p.stock === 0).length;
    const bajoStock = data.filter(
      (p) => p.stock > 0 && p.stock <= STOCK_MIN_LIMIT
    ).length;

    this.animateCount('totalInsumosCount', total);
    this.animateCount('itemsCeroStockCount', ceroStock);
    this.animateCount('bajoStockCount', bajoStock);
  }

  animateCount(
    prop: 'itemsCeroStockCount' | 'bajoStockCount' | 'totalInsumosCount',
    target: number
  ) {
    const duration = 1000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      (this as any)[prop] = Math.floor(progress * target);

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}
