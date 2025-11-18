import { inject, Injectable, signal } from '@angular/core';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { InventoryInterface } from '../interfaces/inventory.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InventoryResponse } from '../utils/responses-interfaces/inventoryResponse';
import { inventoryApiToInventoryArray } from '../utils/mappers/inventoryMapper';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  //Servicios
  httpClient = inject(HttpClient);
  notificationStatusService = inject(NotificacionsStatusService);

  //Atributos
  inventoryData = signal<InventoryInterface[]>([]);
  private inventoryUrl = `${environment.apiKey}/api/inventario`;

  inventoryResource = rxResource({
    loader: () => {
      return this.getInventoryItems();
    },
  });

  //Metodos

  getInventoryItems(): Observable<boolean> {
    return this.httpClient.get<InventoryResponse[]>(this.inventoryUrl).pipe(
      map((data) => {
        this.inventoryData.set(inventoryApiToInventoryArray(data));
        return true;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err) => {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusErrorMessage.set(err.error.detail);
        return of(false);
      })
    );
  }

  postNewItem(newItem: InventoryInterface): Observable<boolean> {
    return this.httpClient.post(this.inventoryUrl, newItem).pipe(
      map(() => {
        this.notificationStatusService.statusTextMessage.set(
          'Insumo agregado con éxito.'
        );
        this.notificationStatusService.statusMessage.set(true);
        return true;
      }),
      catchError((err) => {
        this.notificationStatusService.statusErrorMessage.set(
          err.error.detail || 'Error al crear el nuevo ítem.'
        );
        this.notificationStatusService.statusMessage.set(true);
        return of(false);
      })
    );
  }

  //TODO: Pasar a interfaz la data
  putInventoryitem(data: any, id: number): Observable<boolean> {
    return this.httpClient
      .put<InventoryResponse[]>(
        `http://localhost:5263/api/inventario/${id}`,
        data
      )
      .pipe(
        map((data) => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusTextMessage.set(
            'Item actualizado correctamente'
          );
          return true;
        }),
        //TODO: Implementar interfaz de error en base a asp net
        catchError((err) => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusErrorMessage.set(
            'Hubo un problema en la actualización del item'
          );
          return of(false);
        })
      );
  }

  deleteInventoryitem(id: number): Observable<boolean> {
    return this.httpClient
      .delete<InventoryResponse[]>(`http://localhost:5263/api/inventario/${id}`)
      .pipe(
        map((data) => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusTextMessage.set(
            'Item eliminado correctamente'
          );
          return true;
        }),
        //TODO: Implementar interfaz de error en base a asp net
        catchError((err) => {
          this.notificationStatusService.statusMessage.set(true);
          this.notificationStatusService.statusErrorMessage.set(
            'Hubo un problema en la elimianación del item'
          );
          return of(false);
        })
      );
  }

  searchItemForId(id: number) {
    if (this.inventoryData().length == 0) {
      return;
    }
    const itemFound = this.inventoryData().find((item) => item.id == id);
    return itemFound;
  }
}
