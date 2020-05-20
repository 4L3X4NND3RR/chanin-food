import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChaninfoodComponent } from './menu-chaninfood.component';

describe('MenuChaninfoodComponent', () => {
  let component: MenuChaninfoodComponent;
  let fixture: ComponentFixture<MenuChaninfoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuChaninfoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChaninfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
