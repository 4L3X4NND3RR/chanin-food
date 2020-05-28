import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopin-cart-detil',
  templateUrl: './shopin-cart-detil.component.html',
  styleUrls: ['./shopin-cart-detil.component.css']
})
export class ShopinCartDetilComponent implements OnInit {
  cartItems: CartItem[];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.listarItems();
  }

  listarItems() {
    this.cartItems = this.cartService.cartItems.sort((a, b) => a.id - b.id);
    this.cartService.total.subscribe(
      data => this.total = data
    );
    this.cartService.cantidadTotal.subscribe(
      value => {
        this.existenItem();
      }
    );
    this.cartService.calcularTotal();
  }

  aumentarCantidad(theItem: CartItem) {
    this.cartService.agregarAlCarrito(theItem);
  }

  disminuirCantidad(theItem: CartItem) {
    this.cartService.reducirCantidad(theItem);
    this.existenItem();
  }

  eliminar(theItem: CartItem) {
    this.cartService.quitarItem(theItem);
    this.existenItem();
  }

  existenItem() {
    if (this.cartItems.length === 0) {
      this.router.navigateByUrl('/restaurantes');
    }
  }
}
