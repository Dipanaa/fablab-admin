import { InventoryInterface } from "../../interfaces/inventory.interface"
import { InventoryResponse } from "../responses-interfaces/inventoryResponse"

export function inventoryApiToInventory(responseDataInventory: InventoryResponse): InventoryInterface{

  return {
    id: responseDataInventory.id,
    nombre: responseDataInventory.nombre,
    categoria: responseDataInventory.categoria,
    stock: responseDataInventory.stock,
    ubicacion: responseDataInventory.ubicacion,
    descripcion: responseDataInventory.descripcion,
    estado: responseDataInventory.estado
  }

}


//Este mapea a array
export function inventoryApiToInventoryArray(responseDataInventory: InventoryResponse[]):InventoryInterface[]{
  return responseDataInventory.map((inventoryResponseObj) => inventoryApiToInventory(inventoryResponseObj))
}

//REQUEST

