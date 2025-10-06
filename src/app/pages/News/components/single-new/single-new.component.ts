import { Component, effect, ElementRef, inject, Injector, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { NewsService } from '../../../../services/news.service';
import { News } from '../../../../interfaces/news.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpdatenewComponent } from './components/updatenew/updatenew.component';
import { SuccessComponent } from '../../../../shared/success-component/success-component.component';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'single-new',
  imports: [UpdatenewComponent,SuccessComponent],
  templateUrl: './single-new.component.html',
})
export class SingleNewComponent implements OnInit{

  //Servicios
  renderer2 = inject(Renderer2);
  newsService = inject(NewsService);
  route = inject(ActivatedRoute);
  injector = inject(Injector); //Para destruir effect

  //Atributos
  @ViewChild("successPost") successPost!: ElementRef;
  singleNewsData = signal<News | undefined >(undefined);
  idNew = signal<number>(0);

  //Modo de edicion y PROXIMAMENTE modo de eliminacion
  editMode = signal<boolean>(false);


  //Get noticias rxResource
  resourceNews = rxResource({
    loader: () => {
      return this.newsService.getNewsRxResource()}
  })

  newsEffect = effect(()=>{
    if(this.resourceNews.hasValue()){
      this.getNewById();
    }

  })

  ngOnInit(){
    //Obtener ruta de navegacion
    const idRoute:number = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.idNew.set(idRoute);
  }


  //TODO: Hacer endpoint para la obtencion de una noticia
  //Obtener data de noticia por id
  getNewById(){
    this.singleNewsData.set(
      this.newsService.newsResponse()
      .find((obj)=> obj.id === this.idNew()
    ))
  }

  //Eliminar por id de ruta
  deleteNewByRoute(){
    this.renderer2.removeClass(this.successPost.nativeElement,"hidden");
    this.renderer2.addClass(this.successPost.nativeElement,"flex");
    this.newsService.deleteNew(this.idNew());
  }

  //Modo de formulario
  formMode():void{
    //TODO: Expandir logica para cuando se incluya modo de eliminacion
    (!this.editMode())?this.editMode.set(true):this.editMode.set(false);
  }


}
