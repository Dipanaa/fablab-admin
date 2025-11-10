import { REQUEST } from "@angular/core";
import { ProjectsInterface } from "../../interfaces/projects.interface";
import { ProjectsResponse } from "../responses-interfaces/projectsResponse";
import { ProjectsCreateInterface } from "../request-interfaces/projectsCreateInterface";


//RESPONSES

export function projectsApiToProjects(responseDataUser: ProjectsResponse): ProjectsInterface{

  return {
    id: responseDataUser.id,
    titulo: responseDataUser.titulo,
    descripcionproyecto: responseDataUser.descripcionProyecto,
    categoria: responseDataUser.categoria,
    areaaplicacion: responseDataUser.areaAplicacion,
    fechainicio: responseDataUser.fechaInicio,
    imgurl: responseDataUser.imgUrl
  }

}


//Este mapea a array
export function projectApiToProjectsArray(responseDataUser: ProjectsResponse[]):ProjectsInterface[]{
  return responseDataUser.map((projectResponseObj) => projectsApiToProjects(projectResponseObj))
}

//REQUEST

//Para creacion de projectos con usuarios
export function projectToApi(dataProject: ProjectsInterface, idUsers: Array<number>): ProjectsCreateInterface{

  return{
    id: dataProject.id,
    titulo: dataProject.titulo,
    descripcionproyecto: dataProject.descripcionproyecto,
    categoria: dataProject.categoria,
    areaaplicacion: dataProject.areaaplicacion,
    fechainicio: dataProject.fechainicio,
    ids: idUsers
  }

}




