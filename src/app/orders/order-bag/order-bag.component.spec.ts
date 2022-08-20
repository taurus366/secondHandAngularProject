import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBagComponent } from './order-bag.component';

describe('OrderBagComponent', () => {
  let component: OrderBagComponent;
  let fixture: ComponentFixture<OrderBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
