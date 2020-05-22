import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-chaninfood',
  templateUrl: './menu-chaninfood.component.html',
  styleUrls: ['./menu-chaninfood.component.css']
})
export class MenuChaninfoodComponent implements OnInit {
  
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
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