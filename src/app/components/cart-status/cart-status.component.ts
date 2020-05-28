import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartModalComponent } from '../shopping-cart-modal/shopping-cart-modal.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  total: number = 0.00;
  cantidadTotal: number = 0;

  constructor(public dialog: MatDialog, private cartService: CartService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  openDialog() {
    if(this.cartService.cartItems.length > 0){
      this.dialog.open(ShoppingCartModalComponent);
    }else{
      this.snackbar.open('El carrito se encuentra vacio.', '', {
        duration: 3000
      });
    }
  }

  updateCartStatus() {
    //Subscribe to the cart totalPrice
    this.cartService.total.subscribe(
      data => {
        this.total = data
      }
    );
    //Subscribe to the cart totalQuantity
    this.cartService.cantidadTotal.subscribe(
      data => this.cantidadTotal = data
    );
  }
}
