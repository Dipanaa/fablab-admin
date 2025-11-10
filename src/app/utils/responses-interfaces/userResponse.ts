import { ProjectsResponse } from "./projectsResponse";

export interface UserResponse {
  id:                  number;
  nombre:              string;
  apellido:            string;
  rut:                 string;
  correoInstitucional: string;
  contraseña:          string;
  carrera:             string;
  laboratorioId:       number;
  rolId:               number;
  telefono:            string;
  laboratorio:         Laboratorio;
  rol:                 Rol;
  imgUrl:              string;
  proyectos:           ProjectsResponse[];
}

export interface Laboratorio {
  id:                  number;
  nombreLaboratorio:   string;
  cantidadIntegrantes: number;
  noticias:            any[];
  formularios:         any[];
}

export interface Rol {
  id:             number;
  tipoRol:        string;
  descripcionRol: string;
}

