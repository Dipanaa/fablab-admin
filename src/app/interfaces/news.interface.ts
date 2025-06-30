export interface News {
  id: number,
  titulo: string,
  epigrafe: string,
  autor:string,
  fechapublicacion?: Date,
  contenido: string,
  imageurlprincipal?: string,
  imageurlautor?: string
}
