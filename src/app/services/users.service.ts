import { inject, Injectable, signal } from '@angular/core';
import { UsersInterface } from '../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { finalize, map, tap } from 'rxjs';
import { UserResponse } from '../utils/responses/userResponse';
import { UserApiToUsersArray } from '../utils/mappers/usersMapper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  //Inyectar httpClient
  httpClient = inject(HttpClient);

  //Data user de usuarios
  usuariosData = signal<UsersInterface[]>([])

  constructor() {
  }


  obtenerUsuarios() {

    this.httpClient.get<UserResponse[]>("http://localhost:5263/api/usuarios")
    .pipe(
      map(users => {
        console.log(users);
        return UserApiToUsersArray(users)
      }),
      tap(users => this.usuariosData.set(users)),
      finalize(()=>console.log())
    ).subscribe({
      next: () => {
        console.log("Usuarios Correcto");
      },
      error: (err) => {
        console.log("Hubo un error",err);
      },
      complete: () => {
        console.log("Se completo la peticion");
      }
    })
  }

  agregarUsuario(usuario: any) {
    console.log('UsersService: agregarUsuario ejecutado', usuario);
  }

  editarUsuario(id: number) {
    console.log('UsersService: editarUsuario ejecutado', id);
  }

  eliminarUsuario(id: number) {
    console.log('UsersService: eliminarUsuario ejecutado', id);
  }
}
