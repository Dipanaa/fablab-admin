import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';

@Component({
  selector: 'perfil-usuario',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  //Servicios
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  router = inject(Router);
  notificacionsStatusService = inject(NotificacionsStatusService);

  //Atributos
  editMode = false;
  user: any = {};
  imageSelected = signal<File | null>(null);

  //Formulario de datos
  fbUser:FormGroup = this.formBuilder.group({
    "nombre":["",[Validators.required]],
    "apellido":["",[Validators.required]],
    "rut":["",[Validators.required]],
    "carrera":["",[Validators.required]],
    "telefono":["",[Validators.required]],
  });


  ngOnInit() {
    this.fbUser.patchValue(this.authService.userData()!);
  }

  //Metodos
  imageFileSelected(event: Event): void{
    const input = event.target as HTMLInputElement;

    if (input.files!.length > 0){
      this.imageSelected.set(input.files![0] as File);
      console.log(this.imageSelected());
      return;
    }
    this.imageSelected.set(null);
  }

  submitDataUser(){
    if(this.fbUser.invalid){
      return;
    }
    //Hacemos el formulario Multipart
    const formData = new FormData();

    if(this.imageSelected() != null){
      formData.append("ImgUrl", this.imageSelected()!, this.imageSelected()?.name);
    }

    formData.append("datauser", JSON.stringify(this.fbUser.value));

    //Peticion http
    this.usersService.putUserWithPhoto(formData,this.authService.userData()?.id_usuario!).subscribe((status)=> {
      if(status){
        this.notificacionsStatusService.showMessage();
        this.router.navigateByUrl("/inicio");
        return;
      }
    })

  }


  toggleEdit() {
    this.editMode = true;
    console.log(this.authService.userData());
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
