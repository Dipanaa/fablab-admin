import { Component, inject, OnInit, effect } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../../services/projects.service';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';

// Nota: Tipificación necesaria para que el payload sea correcto
interface ProjectForm {
  id: FormControl<number | null>; // Aseguramos que acepta null si es el valor inicial
  titulo: FormControl<string>;
  descripcionproyecto: FormControl<string>;
  categoria: FormControl<string>;
  areaaplicacion: FormControl<string>;
  fechainicio: FormControl<string>;
}

@Component({
  selector: 'edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
  templateUrl: './edit-project.component.html',
})
export class EditProjectComponent implements OnInit {
  // ================================================================
  // 1. INYECCIÓN DE SERVICIOS
  // ================================================================
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);

  // ================================================================
  // 2. VARIABLES DE ESTADO
  // ================================================================
  public projectId: number | null = null;
  public projectData?: ProjectsInterface;
  public newProjectForm!: FormGroup; // No tipifico aquí para evitar error de inicialización

  // ================================================================
  // 3. CONSTRUCTOR Y EFECTO (La parte reactiva)
  // ================================================================
  constructor() {
    this.projectsService.getProjects();

    effect(() => {
      const projectsList = this.projectsService.projectsData();

      // Si ya tenemos datos Y ya capturamos el ID de la URL...
      if (projectsList.length > 0 && this.projectId !== null) {
        console.log();
        this.loadProjectData(this.projectId);
      } else {
      }
    });
  }

  // ================================================================
  // 4. INICIALIZACIÓN (ngOnInit)
  // ================================================================
  ngOnInit(): void {
    // 1. Capturar ID de la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    // 2. Validar ID
    if (!id || isNaN(id)) {
      this.router.navigate(['/proyectos']);
      return;
    }

    // 3. Guardar ID y preparar formulario VACÍO
    this.projectId = id;

    this.initForm(); // Crea el formulario vacío
  }

  // ================================================================
  // 5. CONFIGURACIÓN DEL FORMULARIO
  // ================================================================
  initForm(): void {
    this.newProjectForm = this.fb.group({
      // Incluimos el ID aquí, con el valor actual de this.projectId
      id: [this.projectId, Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcionproyecto: ['', Validators.required],
      categoria: ['', Validators.required],
      areaaplicacion: ['', Validators.required],
      fechainicio: ['', Validators.required],
    });
  }

  // ================================================================
  // 6. CARGA DE DATOS AL FORMULARIO (PatchValue)
  // ================================================================
  loadProjectData(id: number): void {
    const projectToEdit = this.projectsService
      .projectsData()
      .find((p) => p.id === id);

    if (projectToEdit) {
      // 🚨 CORRECCIÓN CLAVE: Formatear la fecha para input type="date" 🚨
      const apiDate = projectToEdit.fechainicio;
      let formattedDate = '';

      // Se asume formato ISO 8601 (2025-11-27T00:00:00). El input date necesita YYYY-MM-DD
      if (typeof apiDate === 'string' && apiDate) {
        formattedDate = apiDate.split('T')[0];
      }

      this.projectData = projectToEdit; // Guarda los datos para el título H2

      // Llenamos el formulario

      this.newProjectForm.patchValue({
        id: projectToEdit.id,
        titulo: projectToEdit.titulo,
        descripcionproyecto: projectToEdit.descripcionproyecto,
        categoria: projectToEdit.categoria,
        areaaplicacion: projectToEdit.areaaplicacion,

        fechainicio: formattedDate,
      });
    } else {
      console.warn(
        `⚠️ [loadProjectData] No se encontró el proyecto ID ${id} en la lista cargada.`
      );
    }
  }

  // ================================================================
  // 7. ENVÍO DE DATOS (PUT)
  // ================================================================
  submitUpdateProject(): void {
    if (this.newProjectForm.invalid) {
      this.newProjectForm.markAllAsTouched();
      return;
    }

    // Obtenemos los datos limpios del formulario (incluye el ID)
    const updatedPayload = this.newProjectForm.getRawValue();
    console.log(
      '📦 [submitUpdateProject] Payload preparado para enviar:',
      updatedPayload
    );

    this.projectsService.putProject(this.projectId!, updatedPayload).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/proyectos', this.projectId]);
        } else {
        }
      },
      error: (err) => {
        console.error(
          '💥 [SUBSCRIBE ERROR] Ocurrió un error en la petición HTTP:',
          err
        );
      },
    });
  }
}
