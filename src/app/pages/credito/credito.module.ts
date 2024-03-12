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



@NgModule({
  declarations: [
    CreditoComponent,
    CreditNewComponent,
    CreditEditComponent,
    SolicitudListComponent,
    SolicitudCredComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CreditoRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ],
  providers: [
    DatePipe, // Añade DatePipe a los providers del módulo
    // Otros servicios o providers
  ]
})
export class CreditoModule { }
