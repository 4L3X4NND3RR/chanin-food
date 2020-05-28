export class DetallePedido {
    precio: number;
    cantidad: number;
    subTotal: number;
    platillo: String = "http://localhost:8080/api/platillos/";
    pedido: String = "http://localhost:8080/api/pedidos/";
}
