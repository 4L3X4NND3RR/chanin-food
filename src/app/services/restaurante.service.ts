import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurante } from '../common/restaurante';
import { Categoria } from '../common/categoria';
import { Platillo } from '../common/platillo';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private baseUrl = 'http://localhost:8080/api/restaurantes';
  private baseUrlPlatillos = 'http://localhost:8080/api/platillos/search';
  private baseUrlPlatillo = 'http://localhost:8080/api/platillos';

  constructor(private httpClient: HttpClient) { }

  getRestaurantesPaginate(pageNumber: number, pageSize: number): Observable<GetResponseRestaurantes> {
    return this.httpClient.get<GetResponseRestaurantes>(`${this.baseUrl}?page=${pageNumber}&size=${pageSize}`);
  }

  searchRestaurantesPaginate(pageNumber: number, pageSize: number, keyword: String): Observable<GetResponseRestaurantes> {
    const searchUrl = `${this.baseUrl}/search/findByNombreContaining?nombre=${keyword}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseRestaurantes>(searchUrl);
  }

  getCategorias(idRestaurante: number): Observable<Categoria[]> {
    const urlCategorias = `${this.baseUrl}/${idRestaurante}/categorias`;
    return this.httpClient.get<GetResponseCategorias>(urlCategorias).pipe(
      map(response => response._embedded.categoriaPlatilloes)
    );
  }

  getPlatillosPaginate(idCategoria: number, pageNumber: number, pageSize: number): Observable<GetResponsePlatillos> {
    const urlPlatillo = `${this.baseUrlPlatillos}/getPlatillosByCategoriaId?id=${idCategoria}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponsePlatillos>(urlPlatillo);
  }

  searchPlatillosPaginate(pageNumber: number, pageSize: number, keyword: String, idCategoria: number): Observable<GetResponsePlatillos> {
    const searchUrl = `${this.baseUrlPlatillos}/findByNombreContainingAndCategoriaId?nombre=${keyword}&id=${idCategoria}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponsePlatillos>(searchUrl);
  }

  getPlatillo(idPlatillo: number): Observable<Platillo> {
    return this.httpClient.get<Platillo>(`${this.baseUrlPlatillo}/${idPlatillo}`);
  }
}

interface GetResponseRestaurantes {
  _embedded: {
    restaurantes: Restaurante[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCategorias {
  _embedded: {
    categoriaPlatilloes: Categoria[];
  }
}

interface GetResponsePlatillos {
  _embedded: {
    platilloes: Platillo[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}