import { UsersInterface } from "../../interfaces/users.interface";

export interface ProjectsResponse {
  id:                  number;
  titulo:              string;
  categoria:           string;
  descripcionproyecto: string;
  areaaplicacion:      string;
  fechainicio:         Date;
  usuarios: Array<UsersInterface>;
}
