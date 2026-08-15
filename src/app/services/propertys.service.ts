import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { ApartmentResponse, CompletePropertyResponse, CreateApartmentRequest, CreateHouseRequest, CreateLandRequest, CreatePropertyRequest, HouseResponse, LandResponse, PaginatedPropertyResponse } from '../models/property.model';

@Service()
export class PropertysService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/propertys`;

    getAll(
        pagina: number = 1,
        porPagina: number = 10
    ): Observable<PaginatedPropertyResponse> {
        let params = new HttpParams();

        params = params.set('pagina', pagina);

        params = params.set('por_pagina', porPagina);

        return this.httpClient.get<PaginatedPropertyResponse>(
            this.url, {
            params
        });
    };

    delete(id: string): Observable<void> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.delete<void>(urlWithId);
    };

    create(
        form: CreatePropertyRequest
    ): Observable<CompletePropertyResponse> {
        return this.httpClient.post<CompletePropertyResponse>(this.url, form);
    };

    createHouse(
        id: string,
        form: CreateHouseRequest
    ): Observable<HouseResponse> {
        const urlWithId = `${this.url}/${id}/house`;

        return this.httpClient.post<HouseResponse>(urlWithId, form);
    };

    createApartment(
        id: string,
        form: CreateApartmentRequest
    ): Observable<ApartmentResponse> {
        const urlWithId = `${this.url}/${id}/apartment`;

        return this.httpClient.post<ApartmentResponse>(urlWithId, form);
    };

    createLand(
        id: string,
        form: CreateLandRequest
    ): Observable<LandResponse> {
        const urlWithId = `${this.url}/${id}/land`;

        return this.httpClient.post<LandResponse>(urlWithId, form);
    };
}
