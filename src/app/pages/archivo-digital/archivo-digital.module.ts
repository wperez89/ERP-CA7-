import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { ArchivoDigitalComponent } from './archivo-digital.component';
import { ArchivoDigitalRoutes } from './archivo-digital.routing';
import { AgregarDocComponent } from './agregar-doc/agregar-doc.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { AreaDocumentoComponent } from './area-documento/area-documento.component';



@NgModule({
  declarations: [
    ArchivoDigitalComponent,
    AgregarDocComponent,
    TipoDocumentoComponent,
    AreaDocumentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ArchivoDigitalRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class ArchivoDigitalModule { }
