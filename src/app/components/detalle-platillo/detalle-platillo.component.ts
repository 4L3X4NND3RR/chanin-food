import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Platillo } from 'src/app/common/platillo';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-detalle-platillo',
  templateUrl: './detalle-platillo.component.html',
  styleUrls: ['./detalle-platillo.component.css']
})
export class DetallePlatilloComponent implements OnInit {
  colspanSpace: number = 1;
  colspanCard: number = 1;

  platillo: Platillo = new Platillo();

  constructor(private breakpointObserver: BreakpointObserver, private restaurantService: RestauranteService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.colspanSpace = 0;
        this.colspanCard = 3;
      } else {
        this.colspanSpace = 1;
        this.colspanCard = 1;
      }
    });
    this.route.paramMap.subscribe(() => {
      this.handleDetails();
    });
  }

  handleDetails() {
    const idPlatillo: number = +this.route.snapshot.paramMap.get('idPlatillo');
    this.restaurantService.getPlatillo(idPlatillo).subscribe(
      data => {
        this.platillo = data;
      }
    );
  }

  agregarProducto(){
    const theItem = new CartItem(this.platillo);
    this.cartService.agregarAlCarrito(theItem);
  }
}
