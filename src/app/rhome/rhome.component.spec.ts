import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhomeComponent } from './rhome.component';

describe('RhomeComponent', () => {
  let component: RhomeComponent;
  let fixture: ComponentFixture<RhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
