import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buscar(value: String){
    const routeComponent = this.router.url.split('/');
    if (routeComponent[1] === 'restaurantes' || routeComponent[1] === 'buscar-restaurante'){
      this.router.navigateByUrl(`/buscar-restaurante/${value}`);
    } else if (routeComponent[1] === 'platillos' || routeComponent[1] === 'buscar-platillo'){
      this.router.navigateByUrl(`/buscar-platillo/${value}`);
    }
  }
}
