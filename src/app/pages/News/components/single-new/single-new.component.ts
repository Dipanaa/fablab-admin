import { Component, ElementRef, inject, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { NewsService } from '../../../../services/news.service';
import { News } from '../../../../interfaces/news.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpdatenewComponent } from './components/updatenew/updatenew.component';
import { SuccessComponent } from '../../../../shared/success-component/success-component.component';

@Component({
  selector: 'single-new',
  imports: [UpdatenewComponent,SuccessComponent],
  templateUrl: './single-new.component.html',
})
export class SingleNewComponent implements OnInit {

  //Tomamos referencias
  renderer2 = inject(Renderer2);
  NewsService = inject(NewsService);

  //Referencia del dom
  @ViewChild("successPost") successPost!: ElementRef;

  //Data de la noticia
  singleNewsData = signal<News | undefined >(undefined);
  id = signal<number>(0);

  //Modo de edicion y PROXIMAMENTE modo de eliminacion
  editMode = signal<boolean>(false);

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    const idRoute:number = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.id.set(idRoute);

    this.singleNewsData.set(
      this.NewsService.newsResponse()
      .find((obj)=> obj.id === idRoute))
  }

  deleteNewByRoute(){
    this.renderer2.removeClass(this.successPost.nativeElement,"hidden");
    this.renderer2.addClass(this.successPost.nativeElement,"flex");
    this.NewsService.deleteNew(this.id());
  }

  formMode():void{
    //TODO: Expandir logica para cuando se incluya modo de eliminacion
    (!this.editMode())?this.editMode.set(true):this.editMode.set(false);
  }

















}
