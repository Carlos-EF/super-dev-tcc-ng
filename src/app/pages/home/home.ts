import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PropertysService } from '../../services/propertys.service';
import { ClientsService } from '../../services/clients.service';
import { BrokerService } from '../../services/broker.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnDestroy {
  private readonly propertyService = inject(PropertysService);
  private readonly clientsService = inject(ClientsService);
  private readonly brokerService = inject(BrokerService);

  private propertyTypeChart?: Chart;
  private clientTypeChart?: Chart;
  private propertyValueChart?: Chart;

  ngOnDestroy(): void {

    this.propertyTypeChart?.destroy();

    this.clientTypeChart?.destroy();

    this.propertyValueChart?.destroy();
  }
}
