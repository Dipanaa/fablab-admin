import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { ModalEditComponent } from '../../shared/modal-edit/modal-edit.component';

@Component({
  selector: 'inventory',
  imports: [
    CommonModule,
    FormsModule,
    BuscadorComponent,
    PaginationComponent,
    ModalEditComponent,
  ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  ngOnInit() {
    this.calcularMetricasYAnimar();
  }
  paginationService = inject(PaginationService);

  onBuscador($event: Event) {
    throw new Error('Method not implemented.');
  }

  //DB LOCAL QUE DEBEMOS BORRAR Y REEMPLAZAR POR EL BACKEND
  insumos = [
    // --- FILAMENTOS (MUCHO CONSUMO) ---
    {
      id: 1,
      nombre: 'PLA Rojo',
      categoria: 'Filamento',
      stock: 5,
      stockMin: 10, // BAJO STOCK
      ubicacion: 'Estante A1',
      descripcion: 'Carrete de filamento PLA rojo de 1kg.',
    },
    {
      id: 2,
      nombre: 'PLA Negro',
      categoria: 'Filamento',
      stock: 1, // BAJO STOCK
      stockMin: 5,
      ubicacion: 'Estante A1',
      descripcion: 'Carrete de filamento PLA negro de 1kg.',
    },
    {
      id: 3,
      nombre: 'PLA Azul',
      categoria: 'Filamento',
      stock: 0, // SIN STOCK
      stockMin: 3,
      ubicacion: 'Estante A2',
      descripcion: 'Carrete de filamento PLA azul de 1kg.',
    },
    {
      id: 4,
      nombre: 'PETG Transparente',
      categoria: 'Filamento',
      stock: 7,
      stockMin: 5,
      ubicacion: 'Estante A2',
      descripcion: 'Carrete de filamento PETG transparente de 1kg.',
    },
    {
      id: 5,
      nombre: 'TPU Flexible (Amarillo)',
      categoria: 'Filamento',
      stock: 1, // BAJO STOCK
      stockMin: 2,
      ubicacion: 'Estante A3',
      descripcion: 'Filamento flexible de poliuretano.',
    },

    // --- ELECTRÓNICA Y PROTOTIPADO (ALTO CONSUMO DE UNIDADES) ---
    {
      id: 6,
      nombre: 'Arduino UNO R3',
      categoria: 'Electrónica',
      stock: 3, // BAJO STOCK
      stockMin: 5,
      ubicacion: 'Cajón E1',
      descripcion: 'Placa de desarrollo Arduino UNO original.',
    },
    {
      id: 7,
      nombre: 'Sensores de Distancia HC-SR04',
      categoria: 'Electrónica',
      stock: 18,
      stockMin: 10,
      ubicacion: 'Cajón E2',
      descripcion: 'Sensores ultrasónicos para prototipado.',
    },
    {
      id: 8,
      nombre: 'Protoboards (Grandes)',
      categoria: 'Electrónica',
      stock: 0, // SIN STOCK
      stockMin: 5,
      ubicacion: 'Cajón E3',
      descripcion: 'Placas de pruebas grandes de 830 puntos.',
    },
    {
      id: 9,
      nombre: 'Cables Dupont M-M (pack)',
      categoria: 'Electrónica',
      stock: 12,
      stockMin: 20, // BAJO STOCK
      ubicacion: 'Cajón E4',
      descripcion: 'Paquete de 40 cables Dupont de 20cm.',
    },
    {
      id: 10,
      nombre: 'Resistencias 1K ohm (Pack 100)',
      categoria: 'Electrónica',
      stock: 2,
      stockMin: 5, // BAJO STOCK
      ubicacion: 'Cajón E5',
      descripcion: 'Pack de resistencias de uso general.',
    },
    {
      id: 11,
      nombre: 'LEDs (Pack 100)',
      categoria: 'Electrónica',
      stock: 5,
      stockMin: 10, // BAJO STOCK
      ubicacion: 'Cajón E5',
      descripcion: 'Diodos LED 5mm de varios colores.',
    },

    // --- LÁMINAS Y MATERIALES (Laser/CNC/Plotter) ---
    {
      id: 12,
      nombre: 'Acrílico Transparente (3mm)',
      categoria: 'Laser',
      stock: 0, // SIN STOCK
      stockMin: 10,
      ubicacion: 'Rack C1',
      descripcion: 'Plancha de acrílico 3mm, 60x40cm.',
    },
    {
      id: 13,
      nombre: 'Madera Contrachapada (5mm)',
      categoria: 'CNC',
      stock: 0, // SIN STOCK
      stockMin: 5,
      ubicacion: 'Rack C2',
      descripcion: 'Plancha de madera contrachapada 5mm, 60x60cm.',
    },
    {
      id: 14,
      nombre: 'Cartón Pluma (Unidad)',
      categoria: 'Laser',
      stock: 15,
      stockMin: 10,
      ubicacion: 'Rack C3',
      descripcion: 'Láminas de cartón pluma A3.',
    },
    {
      id: 15,
      nombre: 'Vinilo Rojo',
      categoria: 'Plotter',
      stock: 0, // SIN STOCK
      stockMin: 2,
      ubicacion: 'Cajón A4',
      descripcion: 'Rollo de vinilo de corte rojo mate.',
    },
    {
      id: 16,
      nombre: 'Vinilo Negro',
      categoria: 'Plotter',
      stock: 0,
      stockMin: 15,
      ubicacion: 'Cajón A4',
      descripcion: 'Rollo de vinilo de corte negro mate.',
    },

    // --- FERRETERÍA Y HERRAMIENTAS (Pérdida/Desgaste) ---
    {
      id: 17,
      nombre: 'Tornillos M3 (Pack 100)',
      categoria: 'Ferretería',
      stock: 40,
      stockMin: 25,
      ubicacion: 'Cajón F1',
      descripcion: 'Caja de tornillos de acero inoxidable M3x20mm.',
    },
    {
      id: 18,
      nombre: 'Tuercas M3 (Pack 100)',
      categoria: 'Ferretería',
      stock: 10,
      stockMin: 25, // BAJO STOCK
      ubicacion: 'Cajón F1',
      descripcion: 'Caja de tuercas para tornillos M3.',
    },
    {
      id: 19,
      nombre: 'Brocas CNC (Set 10)',
      categoria: 'Herramientas',
      stock: 1, // BAJO STOCK
      stockMin: 3,
      ubicacion: 'Cajón H1',
      descripcion: 'Set de brocas de repuesto para fresadora.',
    },
    {
      id: 20,
      nombre: 'Puntas de Cautín',
      categoria: 'Herramientas',
      stock: 2, // BAJO STOCK
      stockMin: 5,
      ubicacion: 'Cajón H2',
      descripcion: 'Puntas de recambio para estación de soldadura.',
    },
    {
      id: 21,
      nombre: 'Limpiador de Boquillas 3D',
      categoria: 'Accesorios',
      stock: 0, // SIN STOCK
      stockMin: 1,
      ubicacion: 'Estante D',
      descripcion: 'Kit de agujas para desatascar boquillas.',
    },
    {
      id: 22,
      nombre: 'Gafas de Seguridad (Unidad)',
      categoria: 'Seguridad',
      stock: 50,
      stockMin: 10,
      ubicacion: 'Caja S1',
      descripcion: 'Gafas de seguridad transparentes.',
    },
    {
      id: 23,
      nombre: 'Cuchillas para Plotter',
      categoria: 'Plotter',
      stock: 1, // BAJO STOCK
      stockMin: 3,
      ubicacion: 'Cajón A5',
      descripcion: 'Cuchillas de repuesto para Plotter de Corte.',
    },
    {
      id: 24,
      nombre: 'Lija Fina (Pack)',
      categoria: 'Acabado',
      stock: 0, // SIN STOCK
      stockMin: 5,
      ubicacion: 'Estante F2',
      descripcion: 'Packs de lija de grano fino.',
    },
    {
      id: 25,
      nombre: 'Cable Jumper M-H (pack)',
      categoria: 'Electrónica',
      stock: 18,
      stockMin: 10,
      ubicacion: 'Cajón E4',
      descripcion: 'Paquete de 40 cables Dupont Macho-Hembra.',
    },
  ];

  // ---------- Modal ----------
  formbuilder = inject(FormBuilder);

  //Atributos
  modalView = signal<boolean>(false);
  modalId = signal<number>(0);

  fbInventory: FormGroup = this.formbuilder.group({
    Nombre: [''],
    Categoria: [''],
    Stock: [''],
    Ubicación: [''],
  });

  //Metodos
  dataForm(data: Object) {
    console.log(data);
  }

  modalEditView(id: number) {
    this.modalId.set(id);
    !this.modalView() ? this.modalView.set(true) : this.modalView.set(false);
  }

  modalDeleteView() {
    console.log('Hola nerd');
  }

  get totalInsumos() {
    return this.insumos.length;
  }

  get bajoStock() {
    // Devolver cuántos insumos están en o por debajo de su stock mínimo
    return this.insumos.filter((p) => p.stock <= p.stockMin).length;
  }

  get itemsCeroStock(): number {
    return this.insumos.filter((p) => p.stock === 0).length;
  }

  itemsCeroStockCount: number = 0;
  bajoStockCount: number = 0;
  totalInsumosCount: number = 0;

  calcularMetricasYAnimar() {
    // 1. Calcular los valores objetivo (target)
    const total = this.insumos.length;
    const ceroStock = this.insumos.filter((p) => p.stock === 0).length;
    // Asumiendo que 'stockMin' existe en tus objetos
    const bajoStock = this.insumos.filter(
      (p) => p.stock > 0 && p.stock <= p.stockMin
    ).length;

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
