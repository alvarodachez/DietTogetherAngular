import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeGroupComponent } from './welcome-group.component';

describe('WelcomeGroupComponent', () => {
  let component: WelcomeGroupComponent;
  let fixture: ComponentFixture<WelcomeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
