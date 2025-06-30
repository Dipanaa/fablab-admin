import { Component, ElementRef, inject, input, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { NewsService } from '../../../../../../services/news.service';
import { News } from '../../../../../../interfaces/news.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessComponent } from '../../../../../../shared/success-component/success-component.component';

@Component({
  selector: 'updatenew',
  imports: [ReactiveFormsModule,SuccessComponent],
  templateUrl: './updatenew.component.html',
})
export class UpdatenewComponent implements OnInit{

  formbuilder = inject(FormBuilder);

  //Inyectar servicio
  NewsService = inject(NewsService);
  renderer2 = inject(Renderer2);

  //Referencia del dom
  @ViewChild("successPost") successPost!: ElementRef;


  //Id para actualizar
  idUpdate = input<number>();

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

  submitUpdateContent(){
    console.log(this.idUpdate());
    this.renderer2.removeClass(this.successPost.nativeElement,"hidden");
    this.renderer2.addClass(this.successPost.nativeElement,"flex");
    const newUpdate: News = this.UpdateNewForm.value;
    newUpdate.id = this.idUpdate()!;
    this.NewsService.putNew(this.idUpdate()!,newUpdate)
  }

}
