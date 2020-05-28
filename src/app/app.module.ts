import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MenuChaninfoodComponent } from './components/menu-chaninfood/menu-chaninfood.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { MenuPlatillosComponent } from './components/menu-platillos/menu-platillos.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { ShoppingCartModalComponent } from './components/shopping-cart-modal/shopping-cart-modal.component';
import { DetallePlatilloComponent } from './components/detalle-platillo/detalle-platillo.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { SearchComponent } from './components/search/search.component';
import { AuthInterceptor } from './okta/auth.interceptor';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShopinCartDetilComponent } from './components/shopin-cart-detil/shopin-cart-detil.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'buscar-platillo/:keyword', component: PlatillosComponent },
  { path: 'buscar-restaurante/:keyword', component: RestaurantesComponent },
  { path: 'platillo/:idPlatillo', component: DetallePlatilloComponent },
  { path: 'platillos/:idCategoria', component: PlatillosComponent },
  { path: 'menu/:idRestaurante', component: MenuPlatillosComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'callback', component: OktaCallbackComponent },
  { path: '', redirectTo: '/restaurantes', pathMatch: 'full' },
  { path: '**', redirectTo: '/restaurantes', pathMatch: 'full' }
]

const oktaConfig = {
  issuer: 'https://dev-469378.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/callback',
  clientId: '0oad2vtu7lf2PxSjT4x6',
  scopes: ['openid', 'profile', 'phone', 'address']
};

@NgModule({
  declarations: [
    AppComponent,
    MenuChaninfoodComponent,
    RestaurantesComponent,
    MenuPlatillosComponent,
    PlatillosComponent,
    ShoppingCartModalComponent,
    DetallePlatilloComponent,
    CartStatusComponent,
    SearchComponent,
    CheckoutComponent,
    ShopinCartDetilComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OktaAuthModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatStepperModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
