import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotificationComponent } from './emotification.component';

describe('EmotificationComponent', () => {
  let component: EmotificationComponent;
  let fixture: ComponentFixture<EmotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
