import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartAdvencedComponent } from './pie-chart-advenced.component';

describe('PieChartAdvencedComponent', () => {
  let component: PieChartAdvencedComponent;
  let fixture: ComponentFixture<PieChartAdvencedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartAdvencedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartAdvencedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
