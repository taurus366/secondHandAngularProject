import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothReviewComponent } from './cloth-review.component';

describe('ClothReviewComponent', () => {
  let component: ClothReviewComponent;
  let fixture: ComponentFixture<ClothReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
