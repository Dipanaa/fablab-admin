import { Component, computed, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GraphicsService } from '../../../../services/graphics.service';
import { ProjectsByUser } from '../../../../interfaces/graphicsInterfaces/projectsByUser.interface';

Chart.register(...registerables);

// Definimos el color principal RGB del amarillo FabLab: R=255, G=204, B=0
const FABLAB_R = 255;
const FABLAB_G = 204;
const FABLAB_B = 0;
// El color que usaremos para texto y ejes (Gris claro sobre fondo oscuro)
const TEXT_COLOR = '#333333';
const GRID_COLOR = 'rgba(100, 100, 100, 0.2)'; // Líneas muy sutiles

@Component({
  selector: 'charts',
  templateUrl: './charts.html',
})
export class Charts implements OnInit {

  //Servicios
  graphicsService = inject(GraphicsService);

  //Atributos
  dataLabelsData = computed< ProjectsByUser>(()=>{
    if(this.graphicsService.graphicsResource.hasValue()){
      return this.graphicsService.graphicsResource.value();
    }
    return {labelsNombres:[],proyectosCuenta:[]};
  });

  canvasProyectosPorUsuario = viewChild<ElementRef<HTMLCanvasElement>>('proyectosPorUsuarioChart');


  //Metodos
  // ===========================
  // GRÁFICO 1: PROYECTOS POR MES (Línea)
  // ===========================
  public proyectosData = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        label: 'Cantidad de Proyectos',
        data: [5, 8, 12, 6, 9, 15, 10, 7, 13, 11, 14, 16],
        fill: true, // Cambié a true para una mejor visualización del área
        // 🚨 COLOR LÍNEA: Amarillo FabLab Sólido
        borderColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 1)`,
        // 🚨 COLOR FONDO: Amarillo FabLab Transparente
        backgroundColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.2)`,
        tension: 0.4,
        pointBackgroundColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 1)`,
        pointBorderColor: 'white',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  public proyectosConfig: any = {
    type: 'line',
    data: this.proyectosData,
    options: this.baseOptions('Cantidad de Proyectos'),
  };

  // ===========================
  // GRÁFICO 2: USUARIOS ACTIVOS POR MES (Línea)
  // ===========================
  public usuariosData = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        label: 'Usuarios Activos',
        data: [15, 20, 25, 18, 22, 30, 28, 24, 32, 29, 35, 40],
        fill: true,
        // 🚨 COLOR LÍNEA: Amarillo FabLab Sólido
        borderColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 1)`,
        // 🚨 COLOR FONDO: Amarillo FabLab Transparente
        backgroundColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.2)`,
        tension: 0.4,
        pointBackgroundColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 1)`,
        pointBorderColor: 'white',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  public usuariosConfig: any = {
    type: 'line',
    data: this.usuariosData,
    options: this.baseOptions('Usuarios Activos'),
  };

  // ===========================
  // GRÁFICO 3: PROYECTOS POR USUARIO (Barras)
  // ===========================
  public proyectosPorUsuarioData = computed(()=>{
    return {
    labels: this.dataLabelsData().labelsNombres,
    datasets: [
      {
        label: 'Proyectos por Usuario',
        data: this.dataLabelsData().proyectosCuenta,
        // 🚨 COLOR BARRAS: Usaremos el amarillo FabLab en un array para simular la variedad
        backgroundColor: [
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.8)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.7)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.6)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.5)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.9)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.4)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.3)`,
        ],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  })

  public proyectosPorUsuarioConfig = computed(()=>{
    return {
      type: 'bar',
      data: this.proyectosPorUsuarioData(),
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Proyectos por Usuario',
            // 🚨 Color del título del gráfico
            color: TEXT_COLOR,
            font: { size: 16, weight: 'bold' },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            // 🚨 Color de las etiquetas y líneas de grid
            ticks: { color: TEXT_COLOR },
            grid: { color: GRID_COLOR },
          },
          y: {
            ticks: { color: TEXT_COLOR },
            grid: { color: GRID_COLOR },
          },
        },
      },
  }
  });

  // ===========================
  // CONFIGURACIÓN BASE PARA LOS DEMÁS GRÁFICOS
  // ===========================
  baseOptions(label: string) {
    return {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            // 🚨 Color de la leyenda
            color: TEXT_COLOR,
            font: { size: 14 },
          },
        },
        title: {
          display: true,
          text: label,
          // 🚨 Color del título
          color: TEXT_COLOR,
          font: { size: 16, weight: 'bold' },
        },
      },
      scales: {
        x: {
          // 🚨 Color de las etiquetas y líneas de grid
          ticks: { color: TEXT_COLOR },
          grid: { color: GRID_COLOR },
        },
        y: {
          beginAtZero: true,
          ticks: { color: TEXT_COLOR },
          grid: { color: GRID_COLOR },
        },
      },
    };
  }

  constructor() {
    // ¡MODIFICADO! Este effect ahora crea y destruye el gráfico
    effect((onCleanup) => {
      // 1. Lee la config (como ya lo hacías)
      const config = this.proyectosPorUsuarioConfig();

      // 2. Lee el signal del canvas
      const canvasEl = this.canvasProyectosPorUsuario();

      // 3. Si el canvas ya existe en el DOM...
      if (canvasEl) {
        // ...crea el gráfico
        const chart = new Chart(canvasEl.nativeElement, config as any);

        // 4. Registra una "limpieza"
        // Esto se ejecuta ANTES de que el effect corra de nuevo,
        // o cuando el componente se destruye.
        onCleanup(() => {
          chart.destroy(); // Destruye el gráfico anterior
        });
      }
    });
  }




  // ===========================
  // INICIALIZACIÓN DE TODOS LOS GRÁFICOS
  // ===========================
  ngOnInit(): void {
    new Chart('proyectosChart', this.proyectosConfig);
    new Chart('usuariosChart', this.usuariosConfig);
  }
}
