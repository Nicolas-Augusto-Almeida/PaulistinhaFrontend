import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEstoquistaComponent } from './dashboard-estoquista.component';

describe('DashboardEstoquistaComponent', () => {
  let component: DashboardEstoquistaComponent;
  let fixture: ComponentFixture<DashboardEstoquistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEstoquistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEstoquistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
