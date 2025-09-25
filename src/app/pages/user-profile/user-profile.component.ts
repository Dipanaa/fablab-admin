import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'perfil-usuario',
  imports: [FormsModule, NgIf],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  //Servicios
  authService = inject(AuthService);

  //Atributos
  editMode = false;
  user: any = {};

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  toggleEdit() {
    this.editMode = true;
  }

  saveChanges() {
    // Actualiza currentUser
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    // También actualiza el arreglo general localData
    const allUsers = JSON.parse(localStorage.getItem('localData') || '[]');
    const index = allUsers.findIndex((u: any) => u.emailId === this.user.emailId);
    if (index !== -1) {
      allUsers[index] = this.user;
      localStorage.setItem('localData', JSON.stringify(allUsers));
    }

    this.editMode = false;
    alert('Cambios guardados');
  }

  cancelEdit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    this.editMode = false;
  }
}
