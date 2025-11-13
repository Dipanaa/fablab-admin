import { inject, Injectable, signal } from '@angular/core';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { InventoryInterface } from '../interfaces/inventory.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InventoryResponse } from '../utils/responses-interfaces/inventoryResponse';
import { inventoryApiToInventoryArray } from '../utils/mappers/inventoryMapper';

@Injectable({providedIn: 'root'})
export class InventoryService {

  //Servicios
  httpClient = inject(HttpClient);
  notificationStatusService = inject(NotificacionsStatusService);

  //Atributos
  inventoryData = signal<InventoryInterface[]>([]);

  inventoryResource = rxResource({
    loader: ()=> {
      return this.getInventoryItems();
    }
  })


  //Metodos

  getInventoryItems(): Observable<boolean>{
    console.log("la llamada a la api se realizo");
    return this.httpClient.get<InventoryResponse[]>(`http://localhost:5263/api/inventario`)
    .pipe(
      map((data)=> {
        this.inventoryData.update(()=> inventoryApiToInventoryArray(data));
        return true;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusErrorMessage.set(err.error.detail);
        return of(false);
      })
    );
  }
}

