import { Platillo } from './platillo';

export class CartItem {
    id: number;
    idRestaurante: number;
    nombreRestaurante: string;
    nombre: string;
    imageUrl: string;
    precio: number;
    cantidad: number;
    susbtotal: number;

    constructor(platillo: Platillo){
        this.id = platillo.id;
        this.idRestaurante = platillo.idRestaurante;
        this.nombreRestaurante = platillo.nombreRestaurante;
        this.nombre = platillo.nombre;
        this.precio = platillo.precio;
        this.imageUrl = "assets/images/platillos/hamburguesa.jpg";
        this.cantidad = 1;
    }
}
