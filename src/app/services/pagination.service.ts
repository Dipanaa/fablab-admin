import { computed, signal, WritableSignal } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public currentPage = signal<number>(1);

  public itemsPerPage: number = 5;

  private dataList = signal<any[]>([]);

  setDataList(data: any[]): void {
    this.dataList.set(data);
  }

  totalPages = computed(() => {
    return Math.ceil(this.dataList().length / this.itemsPerPage);
  });

  pagedItems = computed(() => {
    const list = this.dataList();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return list.slice(start, end);
  });

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
