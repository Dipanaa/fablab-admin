// import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { UsersInterface } from '../../interfaces/users.interface';

// @Component({
//   selector: 'table-rows',
//   imports: [],
//   templateUrl: './table_rows.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class TableRowsComponent { 
//   currentPage = 1;
//   itemsPerPage = 5;
//   listaDatos = {}

//   OnInit(){
//     getData()
//   }

//   getData(){
//     if (value === '1'){

//       return this.listaDatos
//     }
//     if (value === '0'){

//     }
//   }

//   get totalPages(): number {
//     return Math.ceil(this.listaDatos.length / this.itemsPerPage);
//   }

//   get proyectosPaginados() {
//     const start = (this.currentPage - 1) * this.itemsPerPage;
//     return this.listaDatos.slice(start, start + this.itemsPerPage);
//   }

//   irAPagina(pagina: number) {
//     if (pagina >= 1 && pagina <= this.totalPages) {
//       this.currentPage = pagina;
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }

// }
