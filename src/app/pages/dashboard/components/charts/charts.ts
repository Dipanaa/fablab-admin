import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'charts',
  templateUrl: './charts.html',
})
export class Charts implements OnInit {
  // ===========================
  // GRÁFICO DE PROYECTOS POR MES
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
        fill: false,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
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
  // GRÁFICO DE USUARIOS ACTIVOS POR MES
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
        fill: false,
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
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
  // GRÁFICO DE PROYECTOS POR USUARIO
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
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(167, 139, 250, 0.7)',
          'rgba(79, 70, 229, 0.7)',
          'rgba(129, 140, 248, 0.7)',
          'rgba(147, 197, 253, 0.7)',
          'rgba(56, 189, 248, 0.7)',
        ],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 8, // esquinas redondeadas
      },
    ],
  };

  public proyectosPorUsuarioConfig: any = {
    type: 'bar',
    data: this.proyectosPorUsuarioData,
    options: {
      indexAxis: 'y', // barras horizontales
      responsive: true,
      plugins: {
        legend: {
          display: false, // no mostrar leyenda, es obvio por el título
        },
        title: {
          display: true,
          text: 'Proyectos por Usuario',
          color: '#E0E0E0',
          font: { size: 16, weight: 'bold' },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: '#E0E0E0' },
          grid: { color: 'rgba(100,100,100,0.2)' },
        },
        y: {
          ticks: { color: '#E0E0E0' },
          grid: { color: 'rgba(100,100,100,0.2)' },
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
            color: '#E0E0E0',
            font: { size: 14 },
          },
        },
        title: {
          display: true,
          text: label,
          color: '#E0E0E0',
          font: { size: 16, weight: 'bold' },
        },
      },
      scales: {
        x: {
          ticks: { color: '#E0E0E0' },
          grid: { color: 'rgba(100,100,100,0.2)' },
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#E0E0E0' },
          grid: { color: 'rgba(100,100,100,0.2)' },
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
