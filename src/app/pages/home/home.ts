import { LayoutService } from '@/layout/service/layout.service';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  imports: [
    ChartModule,
    CardModule,
  ],
  template: `
  <!-- Ver no futuro de onde vai vir a informação (possível página de listagem de clientes por corretor) -->
    <div class="card flex w-full max-w-max gap-2 flex-col">
        <div class="flex flex-col w-full justify-end">
          <div class="text-bold text-center text-xl">Clientes Cadastrados:</div>
        
          <div class="text-bold text-center text-xl text-primary mt-2 mb-2"><strong>32</strong></div>
        
          <div class="text-bold text-center text-xl">Sendo:</div>
        
          <p-chart type="doughnut" [data]="doughnutData" [options]="doughnutOptions" />
        </div>
      </div>
    
    <div class="card flex w-full gap-2 flex-col items-center">
      <div class="max-h-max">
        <div class="text-bold text-center text-xl">Imóveis Cadastrados:</div>
      
        <div class="text-bold text-center text-xl text-primary mt-2 mb-2"><strong>68</strong></div>
      
        <div class="text-bold text-center text-xl">Sendo:</div>
      
        <p-chart type="pie" [data]="pieData" [options]="pieOptions" />
      </div>
    </div>
  `,
  styles: ``
})
export class Home {
  doughnutData: any;

  pieData: any;

  doughnutOptions: any;

  pieOptions: any;

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);

    const textColor = documentStyle.getPropertyValue('--text-color');

    this.doughnutData = {
      labels: ['Com Visitas', 'Em Fechamentos'],
      datasets: [
        {
          data: [11, 21],
          backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--p-indigo-400'), documentStyle.getPropertyValue('--p-purple-400'), documentStyle.getPropertyValue('--p-teal-400')]
        }
      ]
    };

    this.doughnutOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    }

    this.pieData = {
      labels: ['Para Venda', 'Para Locação'],
      datasets: [
        {
          data: [42, 26],
          backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--p-indigo-400'), documentStyle.getPropertyValue('--p-purple-400'), documentStyle.getPropertyValue('--p-teal-400')]
        }
      ]
    }

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

  }
}
