import { Component, inject, OnInit } from '@angular/core';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { ProjectsService } from '../../services/projects.service';
import { NewsService } from '../../services/news.service';
import { Charts } from './components/charts/charts';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../shared/status-message/status-message.component';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [SummaryCardsComponent, Charts, FooterComponent],
})
export class DashboardComponent implements OnInit {
  //Atributos
  username: string | null = '';

  //LifeCycles
  ngOnInit() {
    this.username = localStorage.getItem('username');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
