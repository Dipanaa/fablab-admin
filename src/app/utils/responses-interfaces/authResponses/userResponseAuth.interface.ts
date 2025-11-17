export interface UserResponseAuth {
  id:                  number;
  nombre:              string;
  apellido:            string;
  rut:                 string;
  correoInstitucional: string;
  carrera:             string;
  telefono:            string;
  rolId?:              number;
  imgUrl:              string;
}
