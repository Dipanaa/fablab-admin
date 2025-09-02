import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  imports: [FormsModule, NgIf],
})
export class LoginComponent {
  avatarName: string = '';
  isLoginView: boolean = true;


  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: '',
    rut: '',
    carrera: '',
    telefono: '',
    avatarUrl: ''
  };

  userLogin: any = {
    emailId: '',
    password: '',
  };

  router = inject(Router);

  // ===================== Métodos de sanitización =====================
  sanitizeInput(input: string) {
    return input.replace(/[<>;]/g, '');
  }

  // ===================== Validaciones =====================
  isEmailValid(): boolean {
    const email = this.userRegisterObj.emailId || '';
    if (!email) return true;
    return /^[^@\s]+@inacapmail\.cl$/.test(email);
  }

  isRutValid(): boolean {
    const rut = this.userRegisterObj.rut || '';
    if (!rut) return true;
    return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(rut);
  }

  isTelefonoValid(): boolean {
    const tel = this.userRegisterObj.telefono || '';
    if (!tel) return true;
    return /^\+?56\s?9\d{8}$/.test(tel);
  }

  isPasswordValid(): boolean {
    const pwd = this.userRegisterObj.password || '';
    if (!pwd) return true;
    return pwd.length >= 6;
  }

  isNombreValid(): boolean {
    const name = this.userRegisterObj.userName || '';
    return name.trim().length > 0;
  }

  isCarreraValid(): boolean {
    const carrera = this.userRegisterObj.carrera || '';
    return carrera.trim().length > 0;
  }

  // ===================== Eventos =====================
  onRegister() {
    if (!this.isNombreValid() || !this.isEmailValid() || !this.isRutValid() ||
        !this.isTelefonoValid() || !this.isPasswordValid() || !this.isCarreraValid()) {
      alert('Por favor corrige los campos con errores');
      return;
    }

    // Sanitizar inputs
    for (const key in this.userRegisterObj) {
      if (typeof this.userRegisterObj[key] === 'string') {
        this.userRegisterObj[key] = this.sanitizeInput(this.userRegisterObj[key]);
      }
    }

    // Guardar en localStorage
    const localArray = JSON.parse(localStorage.getItem('localData') || '[]');
    localArray.push(this.userRegisterObj);
    localStorage.setItem('localData', JSON.stringify(localArray));

    // Mensaje y reset
    alert('Gracias por tu solicitud, te informaremos cuando esta sea aprobada');
    this.isLoginView = true;
    this.userRegisterObj = { userName:'', password:'', emailId:'', rut:'', carrera:'', telefono:'', avatarUrl:'' };
    this.avatarName = '';
  }

  onLogin() {
    const isLocalData = localStorage.getItem('localData');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);
      const isUserFound = users.find(
        (m: any) =>
          m.emailId === this.userLogin.emailId &&
          m.password === this.userLogin.password
      );
      if (isUserFound != undefined) {
        localStorage.setItem('currentUser', JSON.stringify(isUserFound));
        this.router.navigateByUrl('layout');
      } else {
        alert('Correo o contraseña incorrecta');
      }
    } else {
      alert('Usuario no encontrado');
    }
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarName = file.name;
      this.userRegisterObj.avatarUrl = file;
    }
  }
}
