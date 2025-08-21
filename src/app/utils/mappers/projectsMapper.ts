import { ProjectsInterface } from "../../interfaces/projects.interface";
import { ProjectsResponse } from "../responses/projectsResponse";

export function projectsApiToProjects(responseDataUser: ProjectsResponse): ProjectsInterface{

  return {
    projectId: responseDataUser.id,
    title: responseDataUser.titulo,
    description: responseDataUser.descripcionProyecto,
    date: responseDataUser.fechaInicio,
    categoria: responseDataUser.categoria
  }

}


//Este mapea a array
export function projectApiToProjectsArray(responseDataUser: ProjectsResponse[]):ProjectsInterface[]{

  return responseDataUser.map((projectResponseObj) => projectsApiToProjects(projectResponseObj))

}
