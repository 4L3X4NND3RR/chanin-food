import { Component, OnInit } from '@angular/core';
import { Platillo } from 'src/app/common/platillo';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css']
})
export class PlatillosComponent implements OnInit {
  platillos: Platillo[];
  colspan: number;

  searchMode: boolean = false;
  previusKeyword: string;

  pageNumber: number = 0;
  pageSize: number = 6;
  totalElements: number = 0;
  
  constructor(private breakpointObserver: BreakpointObserver, private restauranteService: RestauranteService, private cartService: CartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listarPlatillos(this.pageNumber);
    });
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.colspan = 3;
      } else {
        this.colspan = 1;
      }
    });
  }

  listarPlatillos(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      this.buscarPlatillo();
    }else{
      const hayIdCategoria: boolean = this.route.snapshot.paramMap.has('idCategoria');
      if (hayIdCategoria) {
        const idCategoria = +this.route.snapshot.paramMap.get('idCategoria');
        localStorage.setItem('categoriaActual', idCategoria.toString());
        this.restauranteService.getPlatillosPaginate(idCategoria, pageNumber, this.pageSize).subscribe(
          this.processResult()
        );
      } else {
        this.router.navigateByUrl('/restaurantes');
      }
    }
  }

  buscarPlatillo() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    const categoriaActual = localStorage.getItem('categoriaActual');
    if (this.previusKeyword != theKeyword) {
      this.pageNumber = 0;
    }
    this.previusKeyword = theKeyword;
    this.restauranteService.searchPlatillosPaginate(this.pageNumber, this.pageSize, theKeyword, +categoriaActual).subscribe(
      this.processResult()
    );
  }

  processResult() {
    return data => {
      this.platillos = data._embedded.platilloes;
      this.pageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  agregarAlCarrito(platillo: Platillo){
    const theCartItem: CartItem = new CartItem(platillo);
    this.cartService.agregarAlCarrito(theCartItem);
  }
}
