import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClothComponent } from './admin-cloth.component';

describe('AdminClothComponent', () => {
  let component: AdminClothComponent;
  let fixture: ComponentFixture<AdminClothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClothComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
