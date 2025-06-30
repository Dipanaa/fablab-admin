import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { RouterLink } from '@angular/router';
import { ErrorComponent } from '../../shared/error-component/error-component.component';

@Component({
  selector: 'app-news',
  imports: [RouterLink,ErrorComponent],
  templateUrl: './News.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {

  //Inyectar newService
  newsService = inject(NewsService);

  constructor(){
    this.newsService.getNews();
  }

}
