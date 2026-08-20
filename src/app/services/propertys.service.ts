import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { ApartmentResponse, CompletePropertyResponse, CreateApartmentRequest, CreateHouseRequest, CreateLandRequest, CreatePropertyRequest, EditApartmentRequest, EditHouseRequest, EditLandRequest, EditPropertyImageRequest, EditPropertyRequest, HouseResponse, LandResponse, PaginatedPropertyResponse, PropertyImageResponse } from '../models/property.model';

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

    getAllImages(
        imovelId: string
    ): Observable<PropertyImageResponse[]> {

        const urlWithId = `${this.url}/${imovelId}/images`;

        return this.httpClient.get<PropertyImageResponse[]>(
            urlWithId
        );
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

    createImages(
        imovelId: string,
        file: File,
        principal: boolean = false
    ): Observable<PropertyImageResponse> {

        const urlWithId = `${this.url}/${imovelId}/images`;

        const formData = new FormData();

        formData.append(
            'file',
            file
        );

        formData.append(
            'principal',
            String(principal)
        );

        return this.httpClient.post<PropertyImageResponse>(
            urlWithId,
            formData
        );
    };

    edit(
        id: string,
        form: EditPropertyRequest
    ): Observable<CompletePropertyResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.put<CompletePropertyResponse>(urlWithId, form);
    };

    editHouse(
        id: string,
        form: EditHouseRequest
    ): Observable<HouseResponse> {
        const urlWithId = `${this.url}/${id}/house`;

        return this.httpClient.put<HouseResponse>(urlWithId, form);
    };

    editApartment(
        id: string,
        form: EditApartmentRequest
    ): Observable<ApartmentResponse> {
        const urlWithId = `${this.url}/${id}/apartment`;

        return this.httpClient.put<ApartmentResponse>(urlWithId, form);
    };

    editLand(
        id: string,
        form: EditLandRequest
    ): Observable<LandResponse> {
        const urlWithId = `${this.url}/${id}/land`;

        return this.httpClient.put<LandResponse>(urlWithId, form);
    };

    editImage(
        imagemId: string,
        form: EditPropertyImageRequest
    ): Observable<PropertyImageResponse> {

        const urlWithId = `${this.url}/images/${imagemId}`;

        return this.httpClient.put<PropertyImageResponse>(
            urlWithId,
            form
        );
    };

    getById(id: string): Observable<CompletePropertyResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.get<CompletePropertyResponse>(urlWithId);
    };

    getHouseById(id: string): Observable<HouseResponse> {
        const urlWithId = `${this.url}/${id}/house`;

        return this.httpClient.get<HouseResponse>(urlWithId);
    };

    getApartmentById(id: string): Observable<ApartmentResponse> {
        const urlWithId = `${this.url}/${id}/apartment`;

        return this.httpClient.get<ApartmentResponse>(urlWithId);
    };

    getLandById(id: string): Observable<LandResponse> {
        const urlWithId = `${this.url}/${id}/land`;

        return this.httpClient.get<LandResponse>(urlWithId);
    };

    getImageById(
        imagemId: string
    ): Observable<PropertyImageResponse> {

        const urlWithId = `${this.url}/images/${imagemId}`;

        return this.httpClient.get<PropertyImageResponse>(
            urlWithId
        );
    };


}
