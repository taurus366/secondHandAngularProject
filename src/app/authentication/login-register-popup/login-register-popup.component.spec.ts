import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterPopupComponent } from './login-register-popup.component';

describe('LoginRegisterPopupComponent', () => {
  let component: LoginRegisterPopupComponent;
  let fixture: ComponentFixture<LoginRegisterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
