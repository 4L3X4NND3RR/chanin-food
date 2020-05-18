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
  private baseUrlPlatillos = 'http://localhost:8080/api/categorias';
  private baseUrlPlatillo = 'http://localhost:8080/api/platillos';

  constructor(private httpClient: HttpClient) { }

  getRestaurantes(): Observable<Restaurante[]> {
    return this.httpClient.get<GetResponseRestaurantes>(this.baseUrl).pipe(
      map(response => response._embedded.restaurantes)
    );
  }

  getCategorias(idRestaurante: number): Observable<Categoria[]> {
    const urlCategorias = `${this.baseUrl}/${idRestaurante}/categorias`;
    return this.httpClient.get<GetResponseCategorias>(urlCategorias).pipe(
      map(response => response._embedded.categoriaPlatilloes)
    );
  }

  getPlatillos(idCategoria: number): Observable<Platillo[]> {
    const urlPlatillo = `${this.baseUrlPlatillos}/${idCategoria}/platillos`;
    return this.httpClient.get<GetResponsePlatillos>(urlPlatillo).pipe(
      map(response => response._embedded.platilloes)
    );
  }

  getPlatillo(idPlatillo: number): Observable<Platillo> {
    return this.httpClient.get<Platillo>(`${this.baseUrlPlatillo}/${idPlatillo}`);
  }
}

interface GetResponseRestaurantes {
  _embedded: {
    restaurantes: Restaurante[];
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
  }
}