import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PropertysService } from '../../services/propertys.service';
import { ClientsService } from '../../services/clients.service';
import { BrokerService } from '../../services/broker.service';
import { PropertyTypeStats, PropertyValueStats } from '../../models/home.model';

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

  updatedAt = '';
  totalProperties = 0;
  totalClients = 0;
  totalBrokers = 0;
  saleProperties = 0;
  rentalProperties = 0;

  propertyTypeStats: PropertyTypeStats = {
    apartamento: 0,
    casa: 0,
    terreno: 0,
    outros: 0
  };

  private propertyValueStats: Record<
    string,
    PropertyValueStats
  > = {
      Apartamento: {
        min: 0,
        average: 0,
        max: 0
      },
      Casa: {
        min: 0,
        average: 0,
        max: 0
      },
      Terreno: {
        min: 0,
        average: 0,
        max: 0
      }
    };

  @ViewChild('propertyTypeChart')
  propertyTypeChartRef?: ElementRef<HTMLCanvasElement>;

  @ViewChild('clientTypeChart')
  clientTypeChartRef?: ElementRef<HTMLCanvasElement>;

  @ViewChild('propertyValueChart')
  propertyValueChartRef?: ElementRef<HTMLCanvasElement>;

  ngOnDestroy(): void {
    this.propertyTypeChart?.destroy();

    this.clientTypeChart?.destroy();

    this.propertyValueChart?.destroy();
  };
}
