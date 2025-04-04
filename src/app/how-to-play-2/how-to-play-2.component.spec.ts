import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPlay2Component } from './how-to-play-2.component';

describe('HowToPlay2Component', () => {
  let component: HowToPlay2Component;
  let fixture: ComponentFixture<HowToPlay2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowToPlay2Component]
    });
    fixture = TestBed.createComponent(HowToPlay2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
