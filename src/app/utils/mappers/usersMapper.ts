import { UsersInterface } from "../../interfaces/users.interface";
import { UserResponse } from "../responses-interfaces/userResponse";
import { projectApiToProjectsArray, projectsApiToProjects } from "./projectsMapper";


//RESPONSES

//Este mapea los objetos del api a users
export function UsersApitoUsers(responseDataUser: UserResponse): UsersInterface{

  return {
    id_usuario : responseDataUser.id,
    nombre: responseDataUser.nombre,
    apellido: responseDataUser.apellido,
    rut: responseDataUser.rut,
    carrera: responseDataUser.carrera,
    email: responseDataUser.correoInstitucional,
    rol: responseDataUser.rol.tipoRol,
    proyectos_asignados: projectApiToProjectsArray(responseDataUser.proyectos ?? [])
  }

}
//Este mapea a array
export function UserApiToUsersArray(responseDataUser: UserResponse[]): UsersInterface[]{
  return responseDataUser.map((userResponseObj) => UsersApitoUsers(userResponseObj))

}


//REQUEST

export function UsersToApi(dataUser: UsersInterface): Object{
  return {
    nombre: dataUser.nombre,
    apellido: dataUser.apellido,
    rut: dataUser.rut,
    correoInstitucional: dataUser.email,
    carrera: dataUser.carrera
  }
}



