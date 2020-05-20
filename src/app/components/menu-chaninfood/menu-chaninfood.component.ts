import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-menu-chaninfood',
  templateUrl: './menu-chaninfood.component.html',
  styleUrls: ['./menu-chaninfood.component.css']
})
export class MenuChaninfoodComponent implements OnInit {
  
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );
}