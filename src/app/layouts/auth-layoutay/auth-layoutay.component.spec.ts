import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayoutayComponent } from './auth-layoutay.component';

describe('AuthLayoutayComponent', () => {
  let component: AuthLayoutayComponent;
  let fixture: ComponentFixture<AuthLayoutayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLayoutayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
