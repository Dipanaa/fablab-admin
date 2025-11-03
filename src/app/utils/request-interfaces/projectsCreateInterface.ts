

//Interfaz de creacion de projectos
export interface ProjectsCreateInterface {
  id:                  number;
  titulo:              string;
  categoria:           string;
  descripcionproyecto: string;
  areaaplicacion:      string;
  fechainicio?:         Date | string;
  ids: Array<number>;
}
