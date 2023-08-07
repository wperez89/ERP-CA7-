import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { CreditoComponent } from './credito.component';
import { CreditoRoutes } from './credito.routing';
import { CreditNewComponent } from './credit-new/credit-new.component';
import { CreditEditComponent } from './credit-edit/credit-edit.component';



@NgModule({
  declarations: [
    CreditoComponent,
    CreditNewComponent,
    CreditEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CreditoRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class CreditoModule { }
