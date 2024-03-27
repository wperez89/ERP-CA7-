import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { CreditoComponent } from './credito.component';
import { CreditoRoutes } from './credito.routing';
import { CreditNewComponent } from './credit-new/credit-new.component';
import { CreditEditComponent } from './credit-edit/credit-edit.component';
import { SolicitudListComponent } from './solicitud/solicitudList.component';
import { SolicitudCredComponent } from './solicitud-cred/solicitud-cred.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { TransaccionesSolicComponent } from './transacciones-solic/transacciones-solic.component';
import { DocumentoSolicitudComponent } from './documento-solicitud/documento-solicitud.component';



@NgModule({
  declarations: [
    CreditoComponent,
    CreditNewComponent,
    CreditEditComponent,
    SolicitudListComponent,
    SolicitudCredComponent,
    TransaccionesSolicComponent,
    DocumentoSolicitudComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CreditoRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxCurrencyDirective
  ],
  providers: [
    DatePipe, // Añade DatePipe a los providers del módulo
    // Otros servicios o providers
  ]
})
export class CreditoModule { }
