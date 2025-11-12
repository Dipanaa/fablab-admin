import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

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
  public proyectosPorUsuarioData = {
    labels: [
      'Alexis',
      'Valentina',
      'Tomás',
      'Ignacia',
      'Sebastián',
      'Roberto',
      'Rodrigo',
    ],
    datasets: [
      {
        label: 'Proyectos por Usuario',
        data: [10, 8, 6, 4, 12, 9, 5],
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

  public proyectosPorUsuarioConfig: any = {
    type: 'bar',
    data: this.proyectosPorUsuarioData,
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
  };

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

  // ===========================
  // INICIALIZACIÓN DE TODOS LOS GRÁFICOS
  // ===========================
  ngOnInit(): void {
    new Chart('proyectosChart', this.proyectosConfig);
    new Chart('usuariosChart', this.usuariosConfig);
    new Chart('proyectosPorUsuarioChart', this.proyectosPorUsuarioConfig);
  }
}
