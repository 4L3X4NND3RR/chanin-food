import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../common/cliente';
import { Observable } from 'rxjs';
import { DetallePedido } from '../common/detalle-pedido';
import { Pedido } from '../common/pedido';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrlCliente = 'http://chaninfoodapirest-env-1.eba-qpcjtrfp.us-east-2.elasticbeanstalk.com/api/clientes';
  private baseUrlDetalle = 'http://chaninfoodapirest-env-1.eba-qpcjtrfp.us-east-2.elasticbeanstalk.com/api/detallePedidos';
  private baseUrlPedido = 'http://chaninfoodapirest-env-1.eba-qpcjtrfp.us-east-2.elasticbeanstalk.com/api/pedidos';

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
