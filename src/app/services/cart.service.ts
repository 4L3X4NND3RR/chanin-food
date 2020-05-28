import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  total: Subject<number> = new Subject<number>();
  cantidadTotal: Subject<number> = new Subject<number>();
  totalCalculado: number;

  constructor() {
    
  }

  existeCarrito(): void{
    if (localStorage.getItem('carrito') !== null) {
      var guardado = localStorage.getItem('carrito');
      this.cartItems = JSON.parse(guardado);
      this.calcularTotal();
    }
  }

  agregarAlCarrito(theItem: CartItem){
    let existe: boolean = false;
    let existiendo: CartItem = undefined;

    if(this.cartItems.length > 0){
      existiendo = this.cartItems.find(item => item.id === theItem.id);
      existe = (existiendo != undefined);
    }
    if(existe){
      existiendo.cantidad++;
    }else{
      this.cartItems.push(theItem);
    }
    this.calcularTotal();
  }

  reducirCantidad(theItem: CartItem){
    theItem.cantidad--;
    if(theItem.cantidad === 0){
      this.quitarItem(theItem);
    }else{
      this.calcularTotal();
    }
  }

  quitarItem(theItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(item => item.id === theItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.calcularTotal();
    }
  }

  calcularTotal() {
    let valorTotal: number = 0;
    let valorCantidadTotal: number = 0;

    for(let item of this.cartItems){
      item.susbtotal = item.cantidad * item.precio;
      valorTotal += item.susbtotal;
      valorCantidadTotal += item.cantidad;
    }

    this.total.next(valorTotal);
    this.cantidadTotal.next(valorCantidadTotal);
    this.totalCalculado = valorTotal;
    this.guardarCarrito();
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.cartItems));
  }
}
