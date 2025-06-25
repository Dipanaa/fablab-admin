import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './News.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent { }
