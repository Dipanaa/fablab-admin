import { UsersInterface } from "../../interfaces/users.interface";
import { UserResponseAuth } from "../responses-interfaces/authResponses/userResponseAuth.interface";
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
    telefono: responseDataUser.telefono,
    foto_perfil: responseDataUser.imgUrl,
    proyectos_asignados: projectApiToProjectsArray(responseDataUser.proyectos ?? [])
  }

}

export function UsersAuthApitoUser(responseDataUser: UserResponseAuth): UsersInterface{

  return {
    id_usuario : responseDataUser.id,
    nombre: responseDataUser.nombre,
    apellido: responseDataUser.apellido,
    rut: responseDataUser.rut,
    carrera: responseDataUser.carrera,
    telefono: responseDataUser.telefono,
    foto_perfil: responseDataUser.imgUrl,
    rolId: responseDataUser.rolId,
    email: responseDataUser.correoInstitucional,
  }

}


//Este mapea a array
export function UserApiToUsersArray(responseDataUser: UserResponse[]): UsersInterface[]{
  return responseDataUser.map((userResponseObj) => UsersApitoUsers(userResponseObj))
}


//REQUEST
export function UsersToApi(dataUser: UsersInterface | any): Object{
  return {
    nombre: dataUser.nombre,
    apellido: dataUser.apellido,
    rut: dataUser.rut,
    correoInstitucional: dataUser.email,
    carrera: dataUser.carrera
  }
}



