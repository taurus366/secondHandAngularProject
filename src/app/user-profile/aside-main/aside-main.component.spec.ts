import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideMainComponent } from './aside-main.component';

describe('AsideMainComponent', () => {
  let component: AsideMainComponent;
  let fixture: ComponentFixture<AsideMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
