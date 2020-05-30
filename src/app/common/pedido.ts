export class Pedido {
    id: number;
    fecha: string;
    entregado: boolean;
    monto_total: number;
    direccion: string;
    telefono: string;
    cliente: string = "http://localhost:8080/api/clientes/";
    restaurante: string = "http://localhost:8080/api/restaurantes/";
}
