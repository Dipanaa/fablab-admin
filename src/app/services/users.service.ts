import { computed, inject, Injectable, signal } from '@angular/core';
import { UsersInterface } from '../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
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

  //Data user de usuarios
  usuariosData = signal<UsersInterface[]>([]);

  //Palabra clave para busqueda
  buscarTermino = signal<string>('');

  //RxResource para data de usuarios
  dataUsersResource = rxResource({
    loader: ()=>{
      return this.obtenerUsuarios();
    }
  })




  // ----Logica del buscador de usuarios---

  // Signal Computada que aplica el filtro de búsqueda
  //Todo: cambiar nombre
  usuariosBuscados = computed(() => {
    // Obtenemos la lista base original
    let listaBase = this.usuariosData();
    const termino = this.buscarTermino().toLowerCase();

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
  obtenerUsuarios(): Observable<boolean> {
    return this.httpClient
    .get<UserResponse[]>('http://localhost:5263/api/usuarios')
    .pipe(
      map((users) => {
        console.log(users);
        this.usuariosData.set(UserApiToUsersArray(users))
        return true;
      }),
      catchError(() => of(false))
    )

  }

  //Put de obtencion de usuarios
  editarUsuario(id: number,dataUser: any): Observable<boolean> {
    return this.httpClient.put(`http://localhost:5263/api/usuarios/${id}`,dataUser)
    .pipe(
      map(()=> {
        this.notificationStatusService.statusMessage.set(true);
        this.notificationStatusService.statusTextMessage.set("Información de usuario actualizada");
        return true;
      }),
      catchError((err)=>{
        this.notificationStatusService.statusErrorMessage.set(err);
        console.log(err);
        return of(false);
      })
    )
  }

  eliminarUsuario(id: number) {
    console.log('UsersService: eliminarUsuario ejecutado', id);
  }

  searchUserForId(id: number): UsersInterface | void{

    if(this.usuariosData().length == 0){
      return;
    }
    const usuarioBuscado = this.usuariosData().find(user => user.id_usuario == id);
    return usuarioBuscado;

  }




}

