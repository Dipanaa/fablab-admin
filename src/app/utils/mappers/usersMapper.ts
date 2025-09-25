import { UsersInterface } from "../../interfaces/users.interface";
import { UserResponse } from "../responses/userResponse";
import { projectApiToProjectsArray, projectsApiToProjects } from "./projectsMapper";


//Este mapea los objetos
export function UsersApitoUsers(responseDataUser: UserResponse): UsersInterface{

  return {
    id_usuario : responseDataUser.id,
    nombre: `${responseDataUser.nombre} ${responseDataUser.apellido}`,
    rut: responseDataUser.rut,
    carrera: responseDataUser.carrera,
    email: responseDataUser.correoInstitucional,
    rol: responseDataUser.rol.tipoRol,
    proyectos_asignados: projectApiToProjectsArray(responseDataUser.proyectos)
  }

}


//Este mapea a array
export function UserApiToUsersArray(responseDataUser: UserResponse[]): UsersInterface[]{
  return responseDataUser.map((userResponseObj) => UsersApitoUsers(userResponseObj))

}



