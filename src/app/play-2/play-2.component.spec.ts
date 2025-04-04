import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Play2Component } from './play-2.component';

describe('Play2Component', () => {
  let component: Play2Component;
  let fixture: ComponentFixture<Play2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Play2Component]
    });
    fixture = TestBed.createComponent(Play2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
