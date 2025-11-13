import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { News } from '../../../../interfaces/news.interface';
import { NewsService } from '../../../../services/news.service';
import { CustomFormsValidations } from '../../../../utils/FormsValidations/CustomValidations';
import { ModalComponentComponent } from '../../../../shared/modal-component/modal-component.component';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/back-button/back-button';

@Component({
  selector: 'app-creator-new',
  imports: [ReactiveFormsModule, ModalComponentComponent, BackButtonComponent],
  templateUrl: './creator-new.component.html',
})
export class CreatorNewComponent {
  //Servicios
  newsService = inject(NewsService);
  formbuilder = inject(FormBuilder);
  renderer2 = inject(Renderer2);
  notificacionsStatusService = inject(NotificacionsStatusService);
  router = inject(Router);
  CustomFormsValidations = CustomFormsValidations;

  //Atributos
  isModalOpen: boolean = false;

  //Campos de los forms
  CreationNewForm: FormGroup = this.formbuilder.group({
    titulo: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(50)],
    ],
    epigrafe: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(80)],
    ],
    autor: ['', [Validators.required]],
    fechapublicacion: [new Date()],
    contenido: ['', [Validators.required]],
    imgurlprincipal: [''],
    imgurlautor: [''],
  });

  //Postear contenido de los forms
  submitPostContent() {
    if (this.CreationNewForm.invalid) {
      this.CreationNewForm.markAllAsTouched();
      return;
    }

    //TODO: Falta loader en boton
    const newPost: News = this.CreationNewForm.value;
    this.newsService.postNew(newPost).subscribe((status) => {
      if (status) {
        this.newsService.getNews();
        this.notificacionsStatusService.showMessage();
        this.router.navigateByUrl('/noticias');
        return;
      }
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
