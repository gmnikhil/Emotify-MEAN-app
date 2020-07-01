import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { STileComponent } from './s-tile.component';

describe('STileComponent', () => {
  let component: STileComponent;
  let fixture: ComponentFixture<STileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(STileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
