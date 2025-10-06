import { computed, inject, Injectable, signal } from '@angular/core';
import { UsersInterface } from '../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable, tap } from 'rxjs';
import { UserResponse } from '../utils/responses/userResponse';
import { UserApiToUsersArray } from '../utils/mappers/usersMapper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //Inyectar httpClient
  httpClient = inject(HttpClient);

  //Data user de usuarios
  usuariosData = signal<UsersInterface[]>([]);

  //Palabra clave para busqueda
  buscarTermino = signal<string>('');

  obtenerUsuarios() {
    return this.httpClient
      .get<UserResponse[]>('http://localhost:5263/api/usuarios')
      .pipe(
        map((users) => {
          console.log(users);
          return UserApiToUsersArray(users);
        }),
        tap((users) => this.usuariosData.set(users)),
        finalize(() => console.log())
      )
      .subscribe({
        next: () => {
          console.log('Usuarios Correcto');
        },
        error: (err) => {
          console.log('Hubo un error', err);
        },
        complete: () => {
          console.log('Se completo la peticion');
        },
      });
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

  // ----Logica del buscador de usuarios---

  // Signal Computada que aplica el filtro de búsqueda
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
}
