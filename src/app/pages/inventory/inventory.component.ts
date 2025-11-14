import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { ModalEditComponent } from '../../shared/modal-edit/modal-edit.component';
import { FooterComponent } from '../../shared/footer/footer';
import { InventoryService } from '../../services/inventory.service';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';

@Component({
  selector: 'inventory',
  imports: [
    CommonModule,
    FormsModule,
    BuscadorComponent,
    PaginationComponent,
    ModalEditComponent,
    FooterComponent,
    StatusMessageComponent,
    ModalComponentComponent
  ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  //Servicios
  paginationService = inject(PaginationService);
  formbuilder = inject(FormBuilder);
  inventoryService = inject(InventoryService);
  notificacionsStatusService = inject(NotificacionsStatusService);

  //Atributos
  modalView = signal<boolean>(false);
  modalDelete = signal<boolean>(false);
  modalId = signal<number>(0);
  itemsCeroStockCount: number = 0;
  bajoStockCount: number = 0;
  totalInsumosCount: number = 0;
  loading = signal<boolean>(false);

  fbInventory: FormGroup = this.formbuilder.group({
    nombre: [''],
    categoria: [''],
    stock: ['',],
    ubicacion: [''],
  });

  //Ciclos de vida
  ngOnInit() {
    this.calcularMetricasYAnimar();
  }

  //Esto no lo eh entendido al 100%
  constructor() {
    effect(() => {
      const inventoryList = this.inventoryService.inventoryData();
      this.paginationService.setDataList(inventoryList);
      this.paginationService.goToPage(1);
    });
  }

  onBuscador($event: Event) {
    throw new Error('Method not implemented.');
  }

  // ---------- Modal ----------

  //Metodos
  dataFormPut(data: FormGroup) {
    if(!data || this.loading() || !this.modalId()){
      return;
    }

    this.loading.set(true);

    this.fbInventory.patchValue(data.value);

    this.inventoryService.putInventoryitem(data,this.modalId()).subscribe(
      (status) => {
        if(status){
          this.loading.set(false);
          this.notificacionsStatusService.showMessage();
          this.inventoryService.inventoryResource.reload();
          this.modalView.set(false);
          return;

        }
        this.loading.set(false);
        this.inventoryService.inventoryResource.reload();
        this.modalView.set(false);
        this.notificacionsStatusService.showMessage();
      }
    )


  }

  dataFormDelete(){
    if(this.loading() || !this.modalId()){
      return;
    }

    this.loading.set(true);

    this.inventoryService.deleteInventoryitem(this.modalId()).subscribe(
      (status) => {
        if(status){
          this.loading.set(false);
          this.notificacionsStatusService.showMessage();
          this.inventoryService.inventoryResource.reload();
          this.modalDelete.set(false);
          return;
        }
        this.loading.set(false);
        this.inventoryService.inventoryResource.reload();
        this.notificacionsStatusService.showMessage();
        this.modalDelete.set(false);

      }
    )




  }

  //Abrir modales
  openModalEditView(id: number) {
    this.modalId.set(id);
    this.modalView.set(true);
    const itemFound = this.inventoryService.searchItemForId(id);
    this.fbInventory.patchValue(itemFound!);
  }

  openModalDeleteView(id: number) {
    this.modalId.set(id);
    this.modalDelete.set(true);
  }


  //Metricas de animacion
  get totalInsumos() {
    return this.inventoryService.inventoryData().length;
  }

  //TODO: Cambiar a idioma ingles
  get bajoStock() {
    // Devolver cuántos insumos están en o por debajo de su stock mínimo
    return this.inventoryService.inventoryData().filter((p) => p.stock <= 10)
      .length;
  }

  get itemsCeroStock(): number {
    return this.inventoryService.inventoryData().filter((p) => p.stock === 0)
      .length;
  }

  calcularMetricasYAnimar() {
    // 1. Calcular los valores objetivo (target)
    const total = this.inventoryService.inventoryData().length;
    const ceroStock = this.inventoryService
      .inventoryData()
      .filter((p) => p.stock === 0).length;
    // Asumiendo que 'stockMin' existe en tus objetos
    const bajoStock = this.inventoryService
      .inventoryData()
      .filter((p) => p.stock > 0 && p.stock <= 10).length;

    // 2. Llamar a la animación para cada métrica
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
      this[prop] = Math.floor(progress * target);

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}
