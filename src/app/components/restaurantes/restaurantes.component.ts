import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Restaurante } from 'src/app/common/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  restaurantes: Restaurante[];
  colspan: number;

  searchMode: boolean = false;
  previusKeyword: string;

  pageNumber: number = 0;
  pageSize: number = 6;
  totalElements: number = 0;

  constructor(private breakpointObserver: BreakpointObserver, private restaurateService: RestauranteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.route.paramMap.subscribe(() => {
      this.listarRestaurantes(this.pageNumber);
    });
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.colspan = 3;
      } else {
        this.colspan = 1;
      }
    });
  }

  listarRestaurantes(pageNumber: number) {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.pageNumber = pageNumber;
    if(this.searchMode){
      this.buscarRestaurante();
    }else{
      this.restaurateService.getRestaurantesPaginate(pageNumber, this.pageSize).subscribe(
        this.processResult()
      );
    }    
  }

  buscarRestaurante(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    if (this.previusKeyword != theKeyword) {
      this.pageNumber = 0;
    }
    this.previusKeyword = theKeyword;
    this.restaurateService.searchRestaurantesPaginate(this.pageNumber, this.pageSize, theKeyword).subscribe(
      this.processResult()
    );
  }

  processResult() {
    return data => {
      this.restaurantes = data._embedded.restaurantes;
      this.pageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  mostrarMenu(){
    this.router.navigateByUrl(`/menu/${1}`);
  }
}
