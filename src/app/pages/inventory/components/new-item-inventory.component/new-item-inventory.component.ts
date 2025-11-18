import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventoryService } from '../../../../services/inventory.service';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { InventoryInterface } from '../../../../interfaces/inventory.interface'; // 🚨 USANDO TU INTERFAZ REAL
import { BackButtonComponent } from '../../../../shared/back-button/back-button';

const FABLAB_CATEGORIES = [
  'Filamento',
  'Electrónica',
  'Láser',
  'Herramientas',
  'Mantenimiento',
  'Arte',
  'Otro',
];

const HARDCODED_STOCK_MIN = 5;

interface CreationForm {
  nombre: FormControl<string>;
  categoria: FormControl<string>;
  stock: FormControl<number>;
  ubicacion: FormControl<string>;
  descripcion: FormControl<string>;
}

@Component({
  selector: 'new-item-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
  templateUrl: './new-item-inventory.component.html',
})
export class newItemInventariComponent implements OnInit {
  // Servicios
  private inventoryService = inject(InventoryService);
  private notificacionsStatusService = inject(NotificacionsStatusService);
  private formbuilder = inject(FormBuilder);
  private router = inject(Router);

  // Formulario Reactivo
  public CreationInventoryForm!: FormGroup;
  public categories = FABLAB_CATEGORIES;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.CreationInventoryForm = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', Validators.required],
      // 🚨 Stock es numérico y con mínimo 0
      stock: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      ubicacion: ['', Validators.required],
      descripcion: [''],
    });
  }

  private calculateStatus(currentStock: number): string {
    if (currentStock === 0) {
      return 'Agotado';
    }
    if (currentStock <= HARDCODED_STOCK_MIN) {
      return 'Bajo Stock';
    }
    return 'Disponible';
  }

  submitItemContent() {
    if (this.CreationInventoryForm.invalid) {
      this.CreationInventoryForm.markAllAsTouched();
      // Notificación de Fallo
      this.notificacionsStatusService.showMessage();
      return;
    }

    const formValues = this.CreationInventoryForm.getRawValue();
    const stockValue = Number(formValues.stock);

    const payload: InventoryInterface = {
      id: 0,
      nombre: formValues.nombre,
      categoria: formValues.categoria,
      stock: stockValue,
      ubicacion: formValues.ubicacion,
      descripcion: formValues.descripcion,
      // Campo CALCULADO:
      estado: this.calculateStatus(stockValue),
    };

    this.inventoryService.postNewItem(payload).subscribe((status) => {
      if (status) {
        this.router.navigateByUrl('/inventario');
      }
    });
  }
}
