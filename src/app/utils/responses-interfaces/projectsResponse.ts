import { UsersInterface } from "../../interfaces/users.interface";


//TODO: Falta mappear a interfaz de la aplicacion
export interface ProjectsResponse {
  id:                  number;
  titulo:              string;
  categoria:           string;
  descripcionProyecto: string;
  areaAplicacion:      string;
  fechaInicio:         Date;
  imgUrl:              string;
  usuarios: UsersInterface[];
  hitoProyecto: HitoProyecto[];
}

export interface HitoProyecto{
  id:                  number;
  nombreHito:          string;
  descripcion:         string;
  fecha:               Date;
}
