export interface ProjectsInterface {
  projectId: number;
  title: string;
  description: string;
  date: string;
  imgUrl: string;
  categoria: string;
  cartera_proyecto: CarteraProyecto;
}

export interface CarteraProyecto {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad_integrantes: number;
}
