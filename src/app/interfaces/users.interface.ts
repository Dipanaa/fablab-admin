import { ProjectsInterface } from "./projects.interface";

export interface UsersInterface {
  id_usuario: number;
  nombre: string;
  rut: string;
  carrera: string;
  email: string;
  rol?: string | null;
  proyectos_asignados?: ProjectsInterface[];
}
