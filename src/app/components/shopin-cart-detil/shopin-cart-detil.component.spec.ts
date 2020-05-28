import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopinCartDetilComponent } from './shopin-cart-detil.component';

describe('ShopinCartDetilComponent', () => {
  let component: ShopinCartDetilComponent;
  let fixture: ComponentFixture<ShopinCartDetilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopinCartDetilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopinCartDetilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
