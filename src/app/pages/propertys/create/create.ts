import { Component, inject, model, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinalityTypes } from '../../../types/finality.types';
import { PropertyTypes } from '../../../types/property.types';
import { FurnishedTypes, FURNITURE_TYPES, FurnitureTypes } from '../../../types/furnished.types';
import { ZONING_TYPES, ZoningTypes } from '../../../types/zoning.types';
import { ClientsTypes } from '../../../types/clients.types';
import { CONTACT_TYPES, ContactTypes } from '../../../types/contact.types';
import { Router, RouterLink } from "@angular/router";
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
import { ApartmentResponse, CreateApartmentRequest, CreateHouseRequest, CreateLandRequest, CreatePropertyRequest, HouseResponse, LandResponse, PropertyImageResponse, PropertyResponse } from '../../../models/property.model';
import { PropertysService } from '../../../services/propertys.service';
import { forkJoin } from 'rxjs';

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
export class CreateProperty implements OnDestroy {
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
  zoningTypes = [...ZONING_TYPES];

  openCondominiumModal: boolean = false;

  openClientModal: boolean = false;

  openBrokerModal: boolean = false;

  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  imageError: string = '';
  isUploadingImages: boolean = false;
  isDraggingImages: boolean = false;

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
    valor: [''],
    valor_iptu: [''],
    valor_condominio: ['']
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

  constructor(
    private router: Router
  ) {
    this.getAllBrokers();

    this.getAllOwners();

    this.getAllCondominiums();
  };

  ngOnDestroy(): void {
    this.imagePreviews.forEach(
      preview => URL.revokeObjectURL(preview)
    );
  }

  private processImageFiles(
    files: File[]
  ): void {
    this.imageError = '';

    const maxSize =
      5 * 1024 * 1024;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {

        this.imageError =
          `O arquivo "${file.name}" não possui um formato permitido. ` +
          'Use JPG, PNG ou WebP.';

        continue;
      }

      if (file.size > maxSize) {
        this.imageError =
          `O arquivo "${file.name}" ultrapassa o limite de 5 MB.`;

        continue;
      }

      const alreadyExists =
        this.selectedImages.some(
          existingFile =>
            existingFile.name === file.name &&
            existingFile.size === file.size &&
            existingFile.lastModified === file.lastModified
        );

      if (alreadyExists) {
        continue;
      }

      this.selectedImages.push(file);

      this.imagePreviews.push(
        URL.createObjectURL(file)
      );
    }
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

  onCondominiumChange(): void {
    const condominiumId = this.propertyForm.controls.condominio.value;

    if (!condominiumId) {
      return;
    }

    const condominium = this.condominiums().find(
      item => item.id === condominiumId
    );

    if (!condominium) {
      return;
    }

    this.propertyForm.patchValue({
      condominio: condominium.id,
      cep: condominium.cep,
      logradouro: condominium.logradouro,
      numero: condominium.numero,
      bairro: condominium.bairro,
      uf: condominium.uf,
      cidade: condominium.cidade
    });
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

  stringToNumber(value: string | number | null): number | null {
    if (value === null || value === '') {
      return null;
    }

    if (typeof value === 'number') {
      return value;
    }

    return Number(
      value
        .replace(/\./g, '')
        .replace(',', '.')
    );
  }

  toggleFurniture(
    form: typeof this.houseForm | typeof this.apartmentForm,
    item: FurnitureTypes
  ): void {

    const value = form.controls.mobilia.value ?? [];

    if (value.includes(item)) {
      form.controls.mobilia.setValue(
        value.filter(furniture => furniture !== item)
      );

      return;
    }

    form.controls.mobilia.setValue([
      ...value,
      item
    ]);

    console.log(form.controls.mobilia.value);
  };

  onImagesSelected(
    event: Event
  ): void {
    const input =
      event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    this.processImageFiles(
      Array.from(input.files)
    );

    input.value = '';
  };

  onImageDragOver(
    event: DragEvent
  ): void {
    event.preventDefault();

    event.stopPropagation();

    this.isDraggingImages = true;
  };

  onImageDragLeave(
    event: DragEvent
  ): void {
    event.preventDefault();

    event.stopPropagation();

    this.isDraggingImages = false;
  };

  onImageDrop(
    event: DragEvent
  ): void {
    event.preventDefault();

    event.stopPropagation();

    this.isDraggingImages = false;

    if (!event.dataTransfer?.files) {
      return;
    }

    this.processImageFiles(
      Array.from(event.dataTransfer.files)
    );
  };

  removeSelectedImage(
    index: number
  ): void {
    const preview =
      this.imagePreviews[index];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    this.selectedImages.splice(
      index,
      1
    );

    this.imagePreviews.splice(
      index,
      1
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

        this.uploadImages(
          id
        );
      },
      error: (error: Error) => {
        console.log(
          'Ocorreu um erro ao tentar cadastrar os dados da casa:',
          error
        );
      }
    });
  };

  createApartment(id: string): void {
    const apartmentValues = this.apartmentForm.getRawValue();

    const newApartmentData: CreateApartmentRequest = {
      imovel_id: id,
      metragem: apartmentValues.metragem,
      quartos: apartmentValues.quartos,
      suites: apartmentValues.suites,
      banheiros: apartmentValues.banheiros,
      garagens: apartmentValues.garagens,
      andares: apartmentValues.andares,
      salas: apartmentValues.salas,
      esta_mobiliado: apartmentValues.esta_mobiliado,
      mobilia: apartmentValues.mobilia,
    };

    this.propertyService.createApartment(
      id,
      newApartmentData
    ).subscribe({
      next: (apartment: ApartmentResponse) => {
        this.toastService.show('create', 'Apartamento');

        this.apartmentForm.reset();

        console.log('Apartamento cadastrado com sucesso:', apartment);

        this.uploadImages(
          id
        );
      },
      error: (error: Error) => {
        console.log(
          'Ocorreu um erro ao tentar cadastrar os dados do apartamento:',
          error
        );
      }
    });
  };

  createLand(id: string): void {
    const landValues = this.landForm.getRawValue();

    const newLandData: CreateLandRequest = {
      imovel_id: id,
      area_total: landValues.area_total,
      zoneamento: landValues.zoneamento,
      medida_esquerda: landValues.medida_esquerda,
      medida_direita: landValues.medida_direita,
      medida_frente: landValues.medida_frente,
      medida_fundo: landValues.medida_fundo,
      coeficiente: landValues.coeficiente,
    };

    this.propertyService.createLand(
      id,
      newLandData
    ).subscribe({
      next: (land: LandResponse) => {
        this.toastService.show('create', 'Terreno');

        this.landForm.reset();

        console.log('Terreno cadastrado com sucesso:', land);

        this.uploadImages(
          id
        );
      },
      error: (error: Error) => {
        console.log(
          'Ocorreu um erro ao tentar cadastrar os dados do terreno:',
          error
        );
      }
    });
  };

  createProperty(): void {
    const formValue = this.propertyForm.getRawValue();

    const newPropertyData: CreatePropertyRequest = {
      proprietario: formValue.proprietario || null,
      corretor: formValue.corretor || null,
      codigo: formValue.codigo!,
      finalidade: formValue.finalidade!,
      tipo: formValue.tipo!,
      em_condominio: formValue.em_condominio!,
      condominio: formValue.condominio || null,
      cep: formValue.cep!,
      logradouro: formValue.logradouro!,
      numero: formValue.numero!,
      bairro: formValue.bairro!,
      uf: formValue.uf!,
      cidade: formValue.cidade!,
      complemento: formValue.complemento || null,
      valor: this.stringToNumber(formValue.valor),
      valor_iptu: this.stringToNumber(formValue.valor_iptu),
      valor_condominio: this.stringToNumber(formValue.valor_condominio)
    };

    this.propertyService.create(
      newPropertyData
    ).subscribe({
      next: (property: PropertyResponse) => {
        this.toastService.show('create', 'Imóvel');

        switch (property.tipo) {
          case 'Casa':
            this.createHouse(property.id);
            break;

          case 'Apartamento':
            this.createApartment(property.id);
            break;

          case 'Terreno':
            this.createLand(property.id);
            break;
        }

        console.log(
          'Imóvel criado com sucesso:',
          property
        );
      },
      error: (error: Error) => {
        console.log(
          'Ocorreu um erro ao tentar cadastrar o imóvel:',
          error
        );
      }
    });
  };

  private uploadImages(
    imovelId: string
  ): void {
    if (this.selectedImages.length === 0) {
      this.finishCreation();
      return;
    }

    this.isUploadingImages = true;

    const uploads =
      this.selectedImages.map(
        (file, index) =>

          this.propertyService.createImages(
            imovelId,
            file,
            index === 0
          )
      );

    forkJoin(uploads).subscribe({
      next: (images: PropertyImageResponse[]) => {
        console.log(
          'Imagens cadastradas:',
          images
        );

        this.isUploadingImages = false;

        this.toastService.show(
          'create',
          'Imagens'
        );

        this.finishCreation();
      },
      error: (error: Error) => {
        this.isUploadingImages = false;

        console.error(
          'Ocorreu um erro ao enviar as imagens:',
          error
        );

        this.imageError =
          'O imóvel foi cadastrado, mas ocorreu um erro ao enviar as imagens.';
      }
    });
  };

  private finishCreation(): void {
    this.selectedImages = [];

    this.imagePreviews.forEach(
      preview => URL.revokeObjectURL(preview)
    );

    this.imagePreviews = [];

    this.router.navigate(
      ['/propertys/list']
    );
  };
}