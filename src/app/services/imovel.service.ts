import { CriarImovelRequest, EditarImovelRequest, ImagensImovelResponse, ImovelResponse } from '@/models/imovel.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private url = `${environment.apiUrl}/imoveis`;

  private urlImagens = `${environment.apiUrl}/imoveis/imagens`;

  private urlImagensCadastrar = `${environment.apiUrl}/imoveis/imagens/cadastrar`;

  private httpClient = inject(HttpClient);

  getAll(): Observable<ImovelResponse[]> {
    return this.httpClient.get<ImovelResponse[]>(this.url);
  }

  getAllImages(): Observable<ImagensImovelResponse[] | null> {
    return this.httpClient.get<ImagensImovelResponse[] | null>(this.urlImagens);
  }

  getById(id: string): Observable<ImovelResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.get<ImovelResponse>(urlComId);
  }

  delete(id: string): Observable<void> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.delete<void>(urlComId);
  }

  create(form: CriarImovelRequest): Observable<ImovelResponse> {
    return this.httpClient.post<ImovelResponse>(this.url, form);
  }

  uploadImages(
    imagens: FormData | null
  ): Observable<ImagensImovelResponse[] | null> {
    return this.httpClient.post<ImagensImovelResponse[] | null>(this.urlImagensCadastrar,
      imagens
    );
  }

  update(
    id: string,
    form: EditarImovelRequest
  ): Observable<ImovelResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.put<ImovelResponse>(
      urlComId,
      form
    )
  }

  activate(id: string): Observable<void> {
    const urlComId = `${this.url}/${id}/ativar`;
    return this.httpClient.put<void>(urlComId, {});
  }

  inactivate(id: string): Observable<void> {
    const urlComId = `${this.url}/${id}/inativar`;
    return this.httpClient.put<void>(urlComId, {});
  }
}
