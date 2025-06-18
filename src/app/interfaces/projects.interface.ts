export interface ProjectsInterface {
  projectId: number;
  participantes: Participantes[];
  title: string;
  description: string;
  date: string;
  imgUrl: string;
}

interface Participantes {
  nombre: string;
  carrera: string;
  rut: string;
  foto: string;
}
