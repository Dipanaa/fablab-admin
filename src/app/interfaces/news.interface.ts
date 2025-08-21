export interface News {
  id: number,
  titulo: string,
  epigrafe: string,
  autor:string,
  fechaPublicacion?: Date,
  contenido: string,
  imageurlprincipal?: string,
  imageurlautor?: string
  estado: string
}
