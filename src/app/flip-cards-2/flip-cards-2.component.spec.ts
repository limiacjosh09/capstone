import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipCards2Component } from './flip-cards-2.component';

describe('FlipCards2Component', () => {
  let component: FlipCards2Component;
  let fixture: ComponentFixture<FlipCards2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlipCards2Component]
    });
    fixture = TestBed.createComponent(FlipCards2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
