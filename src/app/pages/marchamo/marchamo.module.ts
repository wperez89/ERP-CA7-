import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosCuponComponent } from './rifas/datos-cupon/datos-cupon.component';
import { CuponesComponent } from './rifas/cupones/cupones.component';
import { RouterModule } from '@angular/router';
import { MarchamoRoutes } from './marchamo.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DatosCuponComponent,
    CuponesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MarchamoRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class MarchamoModule { }
