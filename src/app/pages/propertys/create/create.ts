import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinalityTypes } from '../../../types/finality.types';
import { PropertyTypes } from '../../../types/property.types';
import { FurnishedTypes, FURNITURE_TYPES, FurnitureTypes } from '../../../types/furnished.types';
import { ZoningTypes } from '../../../types/zoning.types';
import { ClientsTypes } from '../../../types/clients.types';
import { CONTACT_TYPES, ContactTypes } from '../../../types/contact.types';
import { RouterLink } from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';
import { BrokerService } from '../../../services/broker.service';
import { BrokerResponse, CreateBrokerRequest } from '../../../models/broker.model';
import { ClientsService } from '../../../services/clients.service';
import { ClientResponse, CreateClientRequest } from '../../../models/clients.model';
import { SearchCepService } from '../../../services/search.cep.service';
import { CepResponse } from '../../../models/cep.model';
import { CondominiumService } from '../../../services/condominium.service';
import { CondominiumResponse, CreateCondominiumRequest } from '../../../models/condominium.model';
import { ToastService } from '../../../services/toast.service';
import { CharacteristicField } from '../../../types/field.types';
import { CreateHouseRequest, HouseResponse } from '../../../models/property.model';
import { PropertysService } from '../../../services/propertys.service';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgxMaskDirective
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class CreateProperty {
  private readonly formBuilder = inject(FormBuilder);
  private readonly brokerService = inject(BrokerService);
  private readonly clientsService = inject(ClientsService);
  private readonly cepService = inject(SearchCepService);
  private readonly condominiumService = inject(CondominiumService);
  private readonly propertyService = inject(PropertysService);
  private readonly toastService = inject(ToastService);


  brokers = model<BrokerResponse[]>([]);
  owners = model<ClientResponse[]>([]);
  condominiums = model<CondominiumResponse[]>([]);

  contactTypes = [...CONTACT_TYPES];
  furnitureTypes = [...FURNITURE_TYPES];

  openCondominiumModal: boolean = false;

  openClientModal: boolean = false;

  openBrokerModal: boolean = false;

  currentStep = 1;

  propertyForm = this.formBuilder.group({
    proprietario: [''],
    corretor: [''],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    finalidade: [null as FinalityTypes | null, Validators.required],
    tipo: [null as PropertyTypes | null, Validators.required],
    em_condominio: [false, Validators.required],
    condominio: [''],
    cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    numero: [null as number | null, Validators.required],
    bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    complemento: [null as string | null, Validators.maxLength(60)],
    valor: [null as number | null],
    valor_iptu: [null as number | null],
    valor_condominio: [null as number | null]
  });

  houseForm = this.formBuilder.group({
    imovel_id: ['', Validators.required],
    metragem: [null as number | null],
    quartos: [null as number | null],
    suites: [null as number | null],
    banheiros: [null as number | null],
    garagens: [null as number | null],
    andares: [null as number | null],
    salas: [null as number | null],
    esta_mobiliado: [null as FurnishedTypes | null],
    mobilia: [[] as FurnitureTypes[]]
  });

  apartmentForm = this.formBuilder.group({
    imovel_id: ['', Validators.required],
    metragem: [null as number | null],
    quartos: [null as number | null],
    suites: [null as number | null],
    banheiros: [null as number | null],
    garagens: [null as number | null],
    andares: [null as number | null],
    salas: [null as number | null],
    esta_mobiliado: [null as FurnishedTypes | null],
    mobilia: [[] as FurnitureTypes[]]
  });

  landForm = this.formBuilder.group({
    imovel_id: ['', Validators.required],
    area_total: [null as number | null],
    medida_esquerda: [null as number | null],
    medida_direita: [null as number | null],
    medida_frente: [null as number | null],
    medida_fundo: [null as number | null],
    zoneamento: [null as ZoningTypes | null],
    coeficiente: [null as number | null]
  });

  brokerForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4),]],
    creci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern(/^\d{2}\.\d{3}F$/)]],
    numero: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(60)]],
    data_nascimento: [null as string | null, [Validators.minLength(10), Validators.maxLength(10)]],
    rg: [null as string | null, [Validators.minLength(9), Validators.maxLength(9)]],
    cpf: [null as string | null, [Validators.minLength(14), Validators.maxLength(14)]]
  });

  clientForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    numero: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(60)]],
    tipo: ['Proprietário' as ClientsTypes, [Validators.required]],
    como_encontrou: [null as ContactTypes | null, [Validators.required]]
  });

  condominiumForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    numero: [null as number | null, Validators.required],
    bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    cidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
  });

  constructor() {
    this.getAllBrokers();

    this.getAllOwners();

    this.getAllCondominiums();
  };

  getAllBrokers() {
    this.brokerService.getAllForList().subscribe({
      next: (brokers: BrokerResponse[]) => {
        this.brokers.set(brokers);
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao tentar buscar corretores:', error);
      }
    })
  };

  getAllOwners() {
    this.clientsService.getAllOwners().subscribe({
      next: (clients: ClientResponse[]) => {
        this.owners.set(clients);
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao tentar buscar clientes:', error);
      }
    })
  };

  getAllCondominiums() {
    this.condominiumService.getAllForList().subscribe({
      next: (condominiums: CondominiumResponse[]) => {
        this.condominiums.set(condominiums);
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao tentar buscar condomínios:', error);
      }
    })
  };

  searchCepForProperty() {
    const cep: string = this.propertyForm.get('cep')?.getRawValue();

    const cleanCep = cep.replace('-', '').trim();

    if (cleanCep.length == 8) {
      this.cepService.get(cleanCep).subscribe({
        next: (response: CepResponse) => {
          return this.propertyForm.patchValue({
            logradouro: response.street,
            bairro: response.neighborhood,
            cidade: response.city,
            uf: response.state
          });
        },
        error: (error: Error) => {
          return console.log('Ocorreu um erro ao buscar o CEP:', error);
        }
      })
    }
  };

  searchCepForCondominium() {
    const cep: string = this.condominiumForm.get('cep')?.getRawValue();

    const cleanCep = cep.replace('-', '').trim();

    if (cleanCep.length == 8) {
      this.cepService.get(cleanCep).subscribe({
        next: (response: CepResponse) => {
          return this.condominiumForm.patchValue({
            logradouro: response.street,
            bairro: response.neighborhood,
            cidade: response.city,
            uf: response.state
          });
        },
        error: (error: Error) => {
          return console.log('Ocorreu um erro ao buscar o CEP:', error);
        }
      })
    }
  };

  openCreateCondominiumModal() {
    this.openCondominiumModal = true;
  };

  openCreateBrokerModal() {
    this.openBrokerModal = true;
  };

  openCreateClientModal() {
    this.openClientModal = true;
  };

  cancelModal() {
    this.openCondominiumModal = false;

    this.condominiumForm.reset();

    this.openClientModal = false;

    this.clientForm.reset();

    this.openBrokerModal = false;

    this.brokerForm.reset();
  };

  closeModal() {
    this.openCondominiumModal = false;

    this.openBrokerModal = false;

    this.openClientModal = false;
  };

  saveCondominium() {
    if (this.condominiumForm.invalid) {
      this.condominiumForm.markAllAsTouched();

      return;
    }
    const newCondominium: CreateCondominiumRequest = {
      nome: this.condominiumForm.getRawValue().nome!,
      cep: this.condominiumForm.getRawValue().cep!,
      logradouro: this.condominiumForm.getRawValue().logradouro!,
      numero: this.condominiumForm.getRawValue().numero!,
      bairro: this.condominiumForm.getRawValue().bairro!,
      uf: this.condominiumForm.getRawValue().uf!,
      cidade: this.condominiumForm.getRawValue().cidade!
    }

    this.createCondominium(newCondominium);
  };

  createCondominium(condominium: CreateCondominiumRequest) {
    this.condominiumService.create(condominium).subscribe({
      next: (condominium: CondominiumResponse) => {
        this.toastService.show('create', 'Condomínio');

        this.propertyForm.patchValue({
          condominio: condominium.id,
          cep: condominium.cep,
          logradouro: condominium.logradouro,
          numero: condominium.numero,
          bairro: condominium.bairro,
          uf: condominium.uf,
          cidade: condominium.cidade,
        });

        this.getAllCondominiums();

        this.closeModal();
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar cadastrar condomínio:', error);
      }
    })
  };

  saveClient() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();

      return;
    };

    const newClient: CreateClientRequest = {
      nome: this.clientForm.getRawValue().nome!,
      codigo: this.clientForm.getRawValue().codigo!,
      numero: this.clientForm.getRawValue().numero!,
      email: this.clientForm.getRawValue().email!,
      tipo: this.clientForm.getRawValue().tipo!,
      como_encontrou: this.clientForm.getRawValue().como_encontrou!,
    };

    this.createClient(newClient);
  };

  createClient(client: CreateClientRequest) {
    this.clientsService.create(
      client
    ).subscribe({
      next: (client: ClientResponse) => {
        this.toastService.show('create', 'Cliente');

        this.propertyForm.patchValue({
          proprietario: client.id
        });

        this.getAllOwners();

        this.clientForm.reset();

        this.openClientModal = false;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar cadastrar os dados do cliente:', error);
      }
    })
  };

  saveBroker() {
    if (this.brokerForm.invalid) {
      this.brokerForm.markAllAsTouched();

      return;
    }

    const newBroker: CreateBrokerRequest = {
      nome: this.brokerForm.getRawValue().nome!,
      creci: this.brokerForm.getRawValue().creci!,
      codigo: this.brokerForm.getRawValue().codigo!,
      numero: this.brokerForm.getRawValue().numero!,
      email: this.brokerForm.getRawValue().email!,
      data_nascimento: this.brokerForm.getRawValue().data_nascimento!,
      rg: this.brokerForm.getRawValue().rg!,
      cpf: this.brokerForm.getRawValue().cpf!
    }

    this.createBroker(newBroker);
  };

  createBroker(broker: CreateBrokerRequest) {
    this.brokerService.create(broker).subscribe({
      next: (broker: BrokerResponse) => {
        this.toastService.show('create', 'corretor');

        this.getAllBrokers();

        this.propertyForm.patchValue({
          corretor: broker.id
        });

        this.brokerForm.reset();

        this.openBrokerModal = false;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar criar o corretor:', error);
      }
    });
  };

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  };

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  };

  goToStep(step: number): void {
    if (step >= 1 && step <= 3) {
      this.currentStep = step;
    }
  };

  addValue(
    form: typeof this.houseForm | typeof this.apartmentForm,
    campo: CharacteristicField
  ): void {
    const value = form.controls[campo].value ?? 0;

    form.controls[campo].setValue(value + 1);
  };

  removeValue(
    form: typeof this.houseForm | typeof this.apartmentForm,
    campo: CharacteristicField
  ): void {
    const value = form.controls[campo].value ?? 0;

    if (value > 0) {
      form.controls[campo].setValue(value - 1);
    }
  };

  toggleFurniture(
    form: typeof this.houseForm | typeof this.apartmentForm,
    item: FurnitureTypes,
    checked: boolean
  ): void {

    const value = form.controls.mobilia.value ?? [];

    if (checked) {

      if (!value.includes(item)) {
        form.controls.mobilia.setValue([
          ...value,
          item
        ]);
      }

      return;
    }

    form.controls.mobilia.setValue(
      value.filter(furniture => furniture !== item)
    );
  };

  createHouse(id: string): void {
    const houseValues = this.houseForm.getRawValue();

    const newHouseData: CreateHouseRequest = {
      imovel_id: id,
      metragem: houseValues.metragem,
      quartos: houseValues.quartos,
      suites: houseValues.suites,
      banheiros: houseValues.banheiros,
      garagens: houseValues.garagens,
      andares: houseValues.andares,
      salas: houseValues.salas,
      esta_mobiliado: houseValues.esta_mobiliado,
      mobilia: houseValues.mobilia,
    };

    this.propertyService.createHouse(
      id,
      newHouseData
    ).subscribe({
      next: (house: HouseResponse) => {

        this.toastService.show('create', 'Casa');

        this.houseForm.reset();

        console.log('Casa cadastrada com sucesso:', house);
      },

      error: (error: Error) => {
        console.log(
          'Ocorreu um erro ao tentar cadastrar os dados da casa:',
          error
        );
      }
    });
  };
}