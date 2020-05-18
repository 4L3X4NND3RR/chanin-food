import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Restaurante } from 'src/app/common/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  restaurantes: Restaurante[];
  colspan: number;

  constructor(private breakpointObserver: BreakpointObserver, private restaurateService: RestauranteService, private router: Router) { }

  ngOnInit(): void {
    this.listarRestaurantes();
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.colspan = 3;
      } else {
        this.colspan = 1;
      }
    });
  }

  listarRestaurantes() {
    this.restaurateService.getRestaurantes().subscribe(
      data => {
        this.restaurantes = data;
      }
    );
  }

  mostrarMenu(){
    this.router.navigateByUrl(`/menu/${1}`);
  }
}
