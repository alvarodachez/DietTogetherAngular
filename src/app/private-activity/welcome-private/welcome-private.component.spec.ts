import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePrivateComponent } from './welcome-private.component';

describe('WelcomePrivateComponent', () => {
  let component: WelcomePrivateComponent;
  let fixture: ComponentFixture<WelcomePrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomePrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
