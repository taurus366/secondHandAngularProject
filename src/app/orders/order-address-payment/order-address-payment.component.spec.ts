import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddressPaymentComponent } from './order-address-payment.component';

describe('OrderAddressPaymentComponent', () => {
  let component: OrderAddressPaymentComponent;
  let fixture: ComponentFixture<OrderAddressPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAddressPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddressPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
