import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtyPostComponent } from './cty-post.component';

describe('CtyPostComponent', () => {
  let component: CtyPostComponent;
  let fixture: ComponentFixture<CtyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
