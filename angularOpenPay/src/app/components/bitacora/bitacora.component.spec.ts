import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { bitacoraComponent } from './bitacora.component';

describe('bitacoraComponent', () => {
  let component: bitacoraComponent;
  let fixture: ComponentFixture<bitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(bitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
