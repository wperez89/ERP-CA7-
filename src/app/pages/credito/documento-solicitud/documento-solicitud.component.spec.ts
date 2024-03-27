import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoSolicitudComponent } from './documento-solicitud.component';

describe('DocumentoSolicitudComponent', () => {
  let component: DocumentoSolicitudComponent;
  let fixture: ComponentFixture<DocumentoSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoSolicitudComponent]
    });
    fixture = TestBed.createComponent(DocumentoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
