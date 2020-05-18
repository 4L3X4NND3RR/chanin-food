import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MenuChaninfoodComponent } from './components/menu-chaninfood/menu-chaninfood.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { MenuPlatillosComponent } from './components/menu-platillos/menu-platillos.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { ShoppingCartModalComponent } from './components/shopping-cart-modal/shopping-cart-modal.component';
import { DetallePlatilloComponent } from './components/detalle-platillo/detalle-platillo.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

const routes: Routes = [
  { path: 'platillo/:idPlatillo', component: DetallePlatilloComponent },
  { path: 'platillos/:idCategoria', component: PlatillosComponent },
  { path: 'menu/:idRestaurante', component: MenuPlatillosComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: '', redirectTo: '/restaurantes', pathMatch: 'full' },
  { path: '**', redirectTo: '/restaurantes', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuChaninfoodComponent,
    RestaurantesComponent,
    MenuPlatillosComponent,
    PlatillosComponent,
    ShoppingCartModalComponent,
    DetallePlatilloComponent,
    CartStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
