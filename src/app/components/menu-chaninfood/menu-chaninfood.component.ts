import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu-chaninfood',
  templateUrl: './menu-chaninfood.component.html',
  styleUrls: ['./menu-chaninfood.component.css']
})
export class MenuChaninfoodComponent implements OnInit {
  isAuthenticated: boolean;
  
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private cartService: CartService, public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
    this.cartService.existeCarrito();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  estaRestaurantesOrPlatillos(): boolean{
    const urlComponente = this.router.url.split('/');
    return urlComponente[1] === 'restaurantes' || urlComponente[1] === 'buscar-restaurante' || urlComponente[1] === 'platillos' || urlComponente[1] === 'buscar-platillo';
  }
}