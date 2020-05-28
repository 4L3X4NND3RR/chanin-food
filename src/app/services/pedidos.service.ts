import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../common/cliente';
import { Observable } from 'rxjs';
import { DetallePedido } from '../common/detalle-pedido';
import { Pedido } from '../common/pedido';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrlCliente = 'http://localhost:8080/api/clientes';
  private baseUrlDetalle = 'http://localhost:8080/api/detallePedidos';
  private baseUrlPedido = 'http://localhost:8080/api/pedidos';

  constructor(private httpClient: HttpClient) { }

  registrarUsuario(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.post<Cliente>(this.baseUrlCliente, cliente, { headers });
  }

  registrarPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(this.baseUrlPedido, pedido, { headers });
  }

  registrarDetalle(detallePedido: DetallePedido): Observable<DetallePedido> {
    return this.httpClient.post<DetallePedido>(this.baseUrlDetalle, detallePedido, { headers })
  }
}
