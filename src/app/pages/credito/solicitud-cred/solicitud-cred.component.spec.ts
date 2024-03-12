import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCredComponent } from './solicitud-cred.component';

describe('SolicitudCredComponent', () => {
  let component: SolicitudCredComponent;
  let fixture: ComponentFixture<SolicitudCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudCredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
