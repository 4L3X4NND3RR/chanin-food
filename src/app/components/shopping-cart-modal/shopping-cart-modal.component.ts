import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.css']
})

export class ShoppingCartModalComponent implements OnInit {
  isAuthenticated: boolean;
  cartItems: CartItem[];
  total: number = 0;

  constructor(public dialogRef: MatDialogRef<ShoppingCartModalComponent>, private router: Router, private cartService: CartService, public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
    this.listarItems();
  }

  listarItems() {
    this.cartItems = this.cartService.cartItems.sort((a, b) => a.id - b.id);
    this.cartService.total.subscribe(
      data => this.total = data
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
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async irCheckout(){
    if (this.isAuthenticated){
      this.dialogRef.afterClosed().subscribe(value => this.router.navigateByUrl('/checkout'));
      this.dialogRef.close();
    }else{
      this.oktaAuth.login();
    }
  }
}