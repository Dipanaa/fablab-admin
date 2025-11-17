import { ProjectsInterface } from "./projects.interface";

export interface UsersInterface {
  id_usuario: number;
  nombre: string;
  apellido: string;
  rut: string;
  carrera: string;
  email: string;
  telefono: string;
  rol?: string | null;
  rolId?: number;
  foto_perfil?: string;
  proyectos_asignados?: ProjectsInterface[];
}
