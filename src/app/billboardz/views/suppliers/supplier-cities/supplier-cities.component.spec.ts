import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCitiesComponent } from './supplier-cities.component';

describe('SupplierCitiesComponent', () => {
  let component: SupplierCitiesComponent;
  let fixture: ComponentFixture<SupplierCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierCitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
