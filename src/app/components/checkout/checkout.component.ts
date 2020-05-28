import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OktaAuthService } from '@okta/okta-angular';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Cliente } from 'src/app/common/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';
import { DetallePedido } from 'src/app/common/detalle-pedido';
import { Pedido } from 'src/app/common/pedido';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  cartItems: CartItem[];
  restaurantes: number[] = new Array();
  
  id: String;
  nombre: String;
  apellido: String;
  email: String;
  telefono: String;
  direccion: String;

  claims: Array<Claim>;

  constructor(private formBuilder: FormBuilder,
    public oktaAuth: OktaAuthService, 
    private servicePedido: PedidosService, 
    private cartService: CartService, 
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(){
    this.checkoutFormGroup = this.formBuilder.group({
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
    this.datos();
  }

  async datos() {
    const userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
    this.id = this.claims[0].value;
    this.nombre = this.claims[4].value;
    this.apellido = this.claims[5].value;
    this.email = this.claims[3].value;
    this.telefono = this.claims[8].value;
    for (var [, value] of Object.entries(this.claims[9].value)) {
      this.direccion = value;
    }
    this.checkoutFormGroup.get('direccion').setValue(this.direccion);
    this.checkoutFormGroup.get('telefono').setValue(this.telefono);
  }

  onSubmit(){
    this.registrarUsuario();
  }

  registrarUsuario() {
    const cliente: Cliente = new Cliente();
    this.cartItems = this.cartService.cartItems.sort((a, b) => a.id - b.id);
    cliente.id = this.id;
    cliente.nombre = this.nombre;
    cliente.apellido = this.apellido;
    cliente.email = this.email;
    cliente.telefono = this.telefono;
    this.servicePedido.registrarUsuario(cliente).subscribe(
      cliente => {
        this.registrarPedido();
      },
      err => {
        this.snackbar.open('Registro mal!', '', {
          duration: 2000
        });
      }
    );
  }

  registrarPedido() {
    this.restaurantes.push(this.cartItems[0].idRestaurante);
    for (let index = 0; index < this.cartItems.length; index++) {
      const idRestaurante = this.restaurantes.find(element => element === this.cartItems[index].idRestaurante);
      if (idRestaurante === undefined) this.restaurantes.push(this.cartItems[index].idRestaurante);
    }
    for(let idRestaurante of this.restaurantes){
      const pedido: Pedido = new Pedido();
      pedido.entregado = false;
      pedido.monto_total = this.cartService.totalCalculado;
      pedido.direccion = this.checkoutFormGroup.get("direccion").value;
      pedido.cliente = `${pedido.cliente}${this.id}`;
      pedido.restaurante = `${pedido.restaurante}${idRestaurante}`;
      this.servicePedido.registrarPedido(pedido).subscribe(
        value => {
          this.registrarDetalle(value.id, idRestaurante);
        }
      );
      
    }
  }

  registrarDetalle(id: number, idRestaurante: number) {
    for (let item of this.cartItems) {
      if (item.idRestaurante === idRestaurante) {
        const detalle: DetallePedido = new DetallePedido();
        detalle.precio = item.precio;
        detalle.cantidad = item.cantidad;
        detalle.subTotal = item.susbtotal;
        detalle.platillo = `${detalle.platillo}${item.id}`;
        detalle.pedido = `${detalle.pedido}${id}`;
        this.servicePedido.registrarDetalle(detalle).subscribe(
          value => {
            this.cartService.quitarItem(item);
            if (this.cartService.cartItems.length === 0) {
              this.todoBien();
            }
          },
          error => {
            this.snackbar.open('Detalle de pedido mal!', '', {
              duration: 2000
            });
          }
        ); 
      }
    }
  }

  todoBien() {
    this.snackbar.open('Tu pedido ha sido enviado!', '', {
      duration: 3000
    });
    localStorage.removeItem('carrito');
    this.router.navigateByUrl('/restaurantes');
  }
}

interface Claim {
  claim: string;
  value: string;
}