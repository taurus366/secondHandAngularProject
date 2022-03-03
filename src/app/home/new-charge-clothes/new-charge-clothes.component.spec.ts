import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChargeClothesComponent } from './new-charge-clothes.component';

describe('NewChargeClothesComponent', () => {
  let component: NewChargeClothesComponent;
  let fixture: ComponentFixture<NewChargeClothesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChargeClothesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChargeClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
