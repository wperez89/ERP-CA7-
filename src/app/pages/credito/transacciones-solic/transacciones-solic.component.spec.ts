import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesSolicComponent } from './transacciones-solic.component';

describe('TransaccionesSolicComponent', () => {
  let component: TransaccionesSolicComponent;
  let fixture: ComponentFixture<TransaccionesSolicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionesSolicComponent]
    });
    fixture = TestBed.createComponent(TransaccionesSolicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
