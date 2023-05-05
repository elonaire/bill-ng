import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillboardTypesComponent } from './billboard-types.component';

describe('BillboardTypesComponent', () => {
  let component: BillboardTypesComponent;
  let fixture: ComponentFixture<BillboardTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillboardTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillboardTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
