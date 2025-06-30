import { Component, ElementRef, inject, Renderer2, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { News } from '../../../../interfaces/news.interface';
import { NewsService } from '../../../../services/news.service';
import { SuccessComponent } from "../../../../shared/success-component/success-component.component";

@Component({
  selector: 'app-creator-new',
  imports: [ReactiveFormsModule, SuccessComponent],
  templateUrl: './creator-new.component.html',
})
export class CreatorNewComponent {
  //Se inyectan servicios
  newsService = inject(NewsService);
  formbuilder = inject(FormBuilder);
  renderer2 = inject(Renderer2);

  //Tomamos referencias
  @ViewChild("successPost") successPost!: ElementRef;

  //Campos de los forms
  CreationNewForm: FormGroup = this.formbuilder.group({
    titulo: ["",[Validators.required]],
    epigrafe: ["",[Validators.required]],
    autor: ["",[Validators.required]],
    fechapublicacion:[new Date],
    contenido: ["",[Validators.required]],
    imgurlprincipal: [""],
    imgurlautor: [""]
  });


  submitPostContent(){
    console.log(this.CreationNewForm.value);
    const newPost: News = this.CreationNewForm.value;
    this.renderer2.removeClass(this.successPost.nativeElement,"hidden");
    this.renderer2.addClass(this.successPost.nativeElement,"flex");
    this.newsService.postNew(newPost);
  }

}
