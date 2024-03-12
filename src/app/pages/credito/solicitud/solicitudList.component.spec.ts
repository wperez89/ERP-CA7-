import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudListComponent } from './solicitudList.component';

describe('SolicitudComponent', () => {
  let component: SolicitudListComponent;
  let fixture: ComponentFixture<SolicitudListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
