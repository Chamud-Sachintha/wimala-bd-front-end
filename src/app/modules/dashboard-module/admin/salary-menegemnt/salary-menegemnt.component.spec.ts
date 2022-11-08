import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryMenegemntComponent } from './salary-menegemnt.component';

describe('SalaryMenegemntComponent', () => {
  let component: SalaryMenegemntComponent;
  let fixture: ComponentFixture<SalaryMenegemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryMenegemntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryMenegemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
