import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { CustomFormsValidations } from '../../utils/FormsValidations/CustomValidations';

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
  CustomFormsValidations = CustomFormsValidations

  //Atributos
  editMode = signal<boolean>(false);
  user: any = {};
  imageSelected = signal<File | null>(null);

  //Formulario de datos
  fbUser:FormGroup = this.formBuilder.group({
    "nombre":["",[Validators.required]],
    "apellido":["",[Validators.required]],
    "rut":["",[Validators.required,Validators.pattern(/\b[0-9|.]{1,10}\-[K|k|0-9]/gmi)]],
    "carrera":["",[Validators.required]],
    "telefono":["",[Validators.required,Validators.minLength(9)]],
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
      this.fbUser.markAllAsTouched();
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
        this.usersService.dataUsersResource.reload();
        this.router.navigateByUrl("/inicio");
        return;
      }
    })
  }

  openEditModal(){
    this.editMode.set(true);
  }

  closeEditModal(){
    this.editMode.set(false);
  }


}
