import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/common/categoria';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-platillos',
  templateUrl: './menu-platillos.component.html',
  styleUrls: ['./menu-platillos.component.css']
})
export class MenuPlatillosComponent implements OnInit {
  categorias: Categoria[];

  constructor(private serviceRestaurante: RestauranteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    const hayIdRestaurante: boolean = this.route.snapshot.paramMap.has('idRestaurante');
    if (hayIdRestaurante) {
      this.serviceRestaurante.getCategorias(+this.route.snapshot.paramMap.get('idRestaurante')).subscribe(
        data => {
          this.categorias = data;
        }
      );
    } else {
      this.router.navigateByUrl('/restaurantes')
    }
  }
}
