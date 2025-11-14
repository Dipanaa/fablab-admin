import { Component, ElementRef, inject, input, OnInit, output, Renderer2, signal, ViewChild } from '@angular/core';
import { NewsService } from '../../../../../../services/news.service';
import { News } from '../../../../../../interfaces/news.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponentComponent } from '../../../../../../shared/modal-component/modal-component.component';
import { Router } from '@angular/router';
import { NotificacionsStatusService } from '../../../../../../services/notificacionsStatus.service';

@Component({
  selector: 'updatenew',
  imports: [ReactiveFormsModule,ModalComponentComponent],
  templateUrl: './updatenew.component.html',
})
export class UpdatenewComponent implements OnInit{

  //Servicios
  formbuilder = inject(FormBuilder);
  NewsService = inject(NewsService);
  renderer2 = inject(Renderer2);
  notificacionsStatusService = inject(NotificacionsStatusService);
  router = inject(Router);

  //Atributos
  isModalOpen = false; //valor para activacion del modal
  idUpdate = input<number>();
  statusOutput = output<boolean>();
  loading = signal<boolean>(false);

  //Referencia del dom
  @ViewChild("successPost") successPost!: ElementRef;

  //DataForm
  dataFormUpdate = signal<News | undefined >(undefined);

  //Campos de los forms
  UpdateNewForm: FormGroup = this.formbuilder.group({
    titulo: [this.dataFormUpdate()?.titulo,[Validators.required]],
    epigrafe: ["",[Validators.required]],
    autor: ["",[Validators.required]],
    fechapublicacion:[new Date],
    contenido: ["",[Validators.required]],
    imgurlprincipal: [""],
    imgurlautor: [""]
  });


  ngOnInit(): void {
  //Buscar y poner data de noticia
  this.dataFormUpdate.set(
    this.NewsService.newsResponse()
    .find((obj)=> obj.id === this.idUpdate()))

    if(this.dataFormUpdate()){
      this.UpdateNewForm.patchValue(this.dataFormUpdate()!);
    }
  }

  //Peticion para actualizar contenido
  submitUpdateContent(){

    if(!this.idUpdate() || this.loading()){
      return;
    }

    this.loading.set(true);

    const newUpdate: News = this.UpdateNewForm.value;
    newUpdate.id = this.idUpdate()!;
    this.NewsService.putNew(this.idUpdate()!,newUpdate)
    .subscribe((status)=>{
      if(status){
        this.statusOutput.emit(true);
        this.router.navigateByUrl("/noticias");
        this.notificacionsStatusService.showMessage();
        this.loading.set(false);
        return;
      }
      this.statusOutput.emit(true);
      this.router.navigateByUrl("/noticias");
      this.notificacionsStatusService.showMessage();
      this.loading.set(false);

    });

  }

  //Abrir modal de confirmacion
  openModal() {
    this.isModalOpen = true;
  }

  //Cerrar modal de confirmacion
  closeModal() {
    this.isModalOpen = false;
  }
}
