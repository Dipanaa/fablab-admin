import { computed, inject, Injectable, signal } from '@angular/core';
import { UsersInterface } from '../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';
import { UserResponse } from '../utils/responses-interfaces/userResponse';
import { UserApiToUsersArray } from '../utils/mappers/usersMapper';
import { NotificacionsStatusService } from './notificacionsStatus.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //Inyectar httpClient
  httpClient = inject(HttpClient);
  notificationStatusService = inject(NotificacionsStatusService);


  //Atributos

  //Loader put
  loaderPutProfile = signal<boolean>(false);

  //Data user de usuarios
  usersData = signal<UsersInterface[]>([]);

  //Palabra clave para busqueda
  wordToSearch = signal<string>('');

  //RxResource para data de usuarios
  dataUsersResource = rxResource({
    loader: ()=>{
      return this.getUsers();
    }
  })


  // ----Logica del buscador de usuarios---

  // Signal Computada que aplica el filtro de búsqueda
  //Todo: cambiar nombre
  searchUserByFilter = computed(() => {
    // Obtenemos la lista base original
    let listaBase = this.usersData();
    const termino = this.wordToSearch().toLowerCase();

    // Aplicamos el filtro de búsqueda si el término no está vacío
    if (termino.length > 0) {
      listaBase = listaBase.filter(
        (usuario) =>
          // Buscamos si el término coincide con el nombre O el RUT
          usuario.nombre.toLowerCase().includes(termino) ||
          usuario.rut.toLowerCase().includes(termino) ||
          usuario.email.toLowerCase().includes(termino)
      );
    }

    return listaBase;
  });


  //Get de obtencion de usuarios
  getUsers(): Observable<boolean> {
    return this.httpClient
    .get<UserResponse[]>('http://localhost:5263/api/usuarios')
    .pipe(
      map((users) => {
        console.log(users);
        this.usersData.set(UserApiToUsersArray(users))
        return true;
      }),
      catchError(() => of(false))
    )

  }

  //Put de obtencion de usuarios
  putUsers(id: number,dataUser: any): Observable<boolean> {
    return this.httpClient.put(`http://localhost:5263/api/usuarios/${id}`,dataUser)
    .pipe(
      delay(3000),
      map(()=> {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusTextMessage.set("Información de usuario actualizada");
        return true;
      }),
      catchError((err)=>{
        this.notificationStatusService.statusErrorMessage.set("Hubo un error al actualizar el usuario");
        console.log(err);
        return of(false);
      })
    );
  }

  //Put con foto para edicion de usuarios
  putUserWithPhoto(data: any, id:number): Observable<boolean>{
    if(this.loaderPutProfile()){
      return of(false);
    }

    this.loaderPutProfile.set(true);

    return this.httpClient.put(`http://localhost:5263/api/usuarios/perfil/${id}`,data)
    .pipe(
      map(()=> {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusTextMessage.set("Información de usuario actualizada");
        this.loaderPutProfile.set(false);
        return true;
      }),
      catchError((err)=>{
        this.notificationStatusService.statusErrorMessage.set(err);
        console.log(err);
        this.loaderPutProfile.set(false);
        return of(false);
      })
    );
  }
  //Delete de usuarios, SOLO administradores
  deleteUsers(id: number): Observable<boolean> {
    return this.httpClient.delete(`http://localhost:5263/api/usuarios/${id}`)
    .pipe(
      map(()=> {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusTextMessage.set("Usuario eliminado correctamente");
        return true;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusErrorMessage.set("Hubo un error al eliminar el usuario");
        return of(false);
      })
    );

  }

  searchUserForId(id: number): UsersInterface | void{
    if(this.usersData().length == 0){
      return;
    }
    const usuarioBuscado = this.usersData().find(user => user.id_usuario == id);
    return usuarioBuscado;
  }

}

