import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PropertysService } from '../../services/propertys.service';
import { ClientsService } from '../../services/clients.service';
import { BrokerService } from '../../services/broker.service';
import { PropertyTypeStats, PropertyValueStats } from '../../models/home.model';
import { CompletePropertyResponse, PaginatedPropertyResponse } from '../../models/property.model';
import { BrokerResponse } from '../../models/broker.model';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  imports: [

  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly propertyService = inject(PropertysService);
  private readonly clientsService = inject(ClientsService);
  private readonly brokerService = inject(BrokerService);

  private propertyTypeChart?: Chart;
  private clientTypeChart?: Chart;
  private propertyValueChart?: Chart;

  totalProperties = 0;
  totalClients = 0;
  totalBrokers = 0;
  saleProperties = 0;
  rentalProperties = 0;

  properties: CompletePropertyResponse[] = [];

  propertyTypeStats: PropertyTypeStats = {
    apartamento: 0,
    casa: 0,
    terreno: 0,
  };

  private propertyValueStats: {
    Apartamento: PropertyValueStats;
    Casa: PropertyValueStats;
    Terreno: PropertyValueStats;
  } = {
      Apartamento: {
        min: null,
        average: null,
        max: null
      },

      Casa: {
        min: null,
        average: null,
        max: null
      },

      Terreno: {
        min: null,
        average: null,
        max: null
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

  ngAfterViewInit(): void {
    this.loadDashboard();
  };
  private loadDashboard(): void {
    this.loadProperties();

    this.loadBrokers();
  };

  constructor() {
  };


  private loadProperties(): void {
    this.propertyService.getAll(
      undefined,
      1,
      100
    ).subscribe({
      next: (response: PaginatedPropertyResponse) => {
        this.properties = [
          ...response.imoveis
        ];

        console.table(
          this.properties.map(property => ({
            codigo: property.codigo,
            tipo: property.tipo,
            finalidade: property.finalidade,
            valor: property.valor
          }))
        );

        this.calculatePropertyMetrics(
          this.properties
        );

        this.buildPropertyTypeChart();
        this.buildPropertyValueChart();

        console.log(
          'IMÓVEIS RECEBIDOS:',
          response
        );

        console.log(
          'LISTA DE IMÓVEIS:',
          response.imoveis
        );

        this.properties = [
          ...response.imoveis
        ];
      },

      error: (error) => {
        console.error(
          'Erro ao carregar imóveis:',
          error
        );
      }
    });
  }

  private loadBrokers(): void {
    this.brokerService
      .getAllForList()
      .subscribe({
        next: (brokers: BrokerResponse[]) => {
          this.totalBrokers = brokers.length;
        },
        error: (error) => {
          console.error(
            'Erro ao carregar corretores:',
            error
          );
        }
      });
  };

  private calculatePropertyMetrics(
    properties: CompletePropertyResponse[]
  ): void {

    this.totalProperties = properties.length;

    this.saleProperties = properties.filter(
      property => property.finalidade === 'Venda'
    ).length;

    this.rentalProperties = properties.filter(
      property => property.finalidade === 'Locação'
    ).length;

    let apartamento = 0;
    let casa = 0;
    let terreno = 0;

    for (const property of properties) {
      console.log(
        'IMÓVEL:',
        property.codigo,
        'TIPO:',
        property.tipo
      );

      switch (property.tipo) {
        case 'Apartamento':
          apartamento++;
          break;

        case 'Casa':
          casa++;
          break;

        case 'Terreno':
          terreno++;
          break;

        default:
          console.warn(
            'Tipo de imóvel desconhecido:',
            property.tipo
          );
      }
    }

    this.propertyTypeStats = {
      apartamento,
      casa,
      terreno
    };

    this.calculatePropertyValues(
      properties
    );

    console.log(
      'ESTATÍSTICAS DOS TIPOS:',
      this.propertyTypeStats
    );
  }

  private calculatePropertyValues(
    properties: CompletePropertyResponse[]
  ): void {

    const types = [
      'Apartamento',
      'Casa',
      'Terreno'
    ] as const;

    for (const type of types) {

      const values = properties
        .filter(
          property =>
            property.tipo === type &&
            property.finalidade === 'Venda' &&
            property.valor !== null &&
            property.valor !== undefined
        )
        .map(
          property => Number(property.valor)
        )
        .filter(
          value =>
            Number.isFinite(value) &&
            value > 0
        )
        .sort(
          (a, b) => a - b
        );

      if (values.length === 0) {
        this.propertyValueStats[type] = {
          min: null,
          average: null,
          max: null
        };

        continue;
      }

      const total = values.reduce(
        (sum, value) => sum + value,
        0
      );

      this.propertyValueStats[type] = {
        min: values[0],
        average: total / values.length,
        max: values[values.length - 1]
      };
    }
  }

  private buildPropertyTypeChart(): void {

    if (!this.propertyTypeChartRef) {
      return;
    }

    this.propertyTypeChart?.destroy();

    const labels = [
      'Apartamento',
      'Casa',
      'Terreno'
    ];

    const data = [
      this.propertyTypeStats.apartamento,
      this.propertyTypeStats.casa,
      this.propertyTypeStats.terreno
    ];

    console.log(
      'DADOS DO GRÁFICO:',
      {
        labels,
        data
      }
    );

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',

      data: {
        labels,

        datasets: [
          {
            data,

            backgroundColor: [
              '#E3A857',
              '#57C690',
              '#6FA8DC'
            ],

            borderColor: '#12161C',
            borderWidth: 4,
            hoverOffset: 5
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        cutout: '68%',

        plugins: {
          legend: {
            position: 'bottom',

            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 18
            }
          },

          tooltip: {
            callbacks: {
              label: (context) => {

                const value = Number(
                  context.raw
                );

                return `${context.label}: ${value}`;
              }
            }
          }
        }
      }
    };

    this.propertyTypeChart = new Chart(
      this.propertyTypeChartRef.nativeElement,
      config
    );
  }

  private buildPropertyValueChart(): void {
    if (!this.propertyValueChartRef) {
      return;
    }

    this.propertyValueChart?.destroy();

    const getStats = (
      type: 'Apartamento' | 'Casa' | 'Terreno'
    ): PropertyValueStats => {
      return this.propertyValueStats[type];
    };

    const apartment = getStats('Apartamento');
    const house = getStats('Casa');
    const land = getStats('Terreno');

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: [
          'Apartamento',
          'Casa',
          'Terreno'
        ],

        datasets: [
          {
            label: 'Mínimo',
            data: [
              apartment.min,
              house.min,
              land.min
            ],

            backgroundColor: 'rgba(111,168,220,.50)',
            borderColor: '#6FA8DC',
            borderWidth: 1,
            borderRadius: 5
          },

          {
            label: 'Valor médio',

            data: [
              apartment.average,
              house.average,
              land.average
            ],

            backgroundColor: 'rgba(227,168,87,.88)',
            borderColor: '#E3A857',
            borderWidth: 1,
            borderRadius: 5
          },

          {
            label: 'Máximo',

            data: [
              apartment.max,
              house.max,
              land.max
            ],

            backgroundColor: 'rgba(87,198,144,.55)',
            borderColor: '#57C690',
            borderWidth: 1,
            borderRadius: 5
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },

          y: {
            beginAtZero: true,

            ticks: {
              callback: (value) =>
                this.formatCompactCurrency(
                  Number(value)
                )
            }
          }
        },

        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 18
            }
          },

          tooltip: {
            callbacks: {
              label: (context) => {
                const value = Number(
                  context.raw
                );

                return ` ${context.dataset.label}: ${this.formatCurrency(value)}`;
              }
            }
          }
        }
      }
    };

    this.propertyValueChart = new Chart(
      this.propertyValueChartRef.nativeElement,
      config
    );
  };

  private formatCurrency(
    value: number
  ): string {
    return new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
      }
    ).format(value);
  };

  private formatCompactCurrency(
    value: number
  ): string {
    if (value >= 1_000_000) {
      return `R$ ${(value / 1_000_000)
        .toFixed(1)} mi`;
    }

    if (value >= 1_000) {
      return `R$ ${Math.round(
        value / 1_000
      )} mil`;
    }

    return this.formatCurrency(
      value
    );
  };

  get propertyValueInsight(): string {
    const apartment =
      this.propertyValueStats.Apartamento;

    const house =
      this.propertyValueStats.Casa;

    const land =
      this.propertyValueStats.Terreno;

    const parts: string[] = [];

    if (apartment.average && apartment.average > 0) {
      parts.push(
        `apartamentos apresentam valor médio de aproximadamente ${this.formatCurrency(apartment.average)}`
      );
    }

    if (house.average && house.average > 0) {
      parts.push(
        `casas de ${this.formatCurrency(house.average)}`
      );
    }

    if (land.average && land.average > 0) {
      parts.push(
        `terrenos de ${this.formatCurrency(land.average)}`
      );
    }

    if (parts.length === 0) {
      return 'Ainda não existem dados suficientes de imóveis de venda para montar essa comparação.';
    }

    return `${parts.join(', ')}. Os imóveis de locação não entram nesta comparação por trabalharem com valor mensal.`;
  };
}
