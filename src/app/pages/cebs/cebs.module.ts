import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodoComponent } from './tablas/periodo/periodo.component';
import { AprobadoresComponent } from './tablas/aprobadores/aprobadores.component';
import { BeneficiosComponent } from './tablas/beneficios/beneficios.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { cebsRoutes } from './cebs.routing';
import { ListasubsidiosComponent } from './subsidios/listasubsidios/listasubsidios.component';
import { NewsubsidioComponent } from './subsidios/newsubsidio/newsubsidio.component';
import { EditsubsidioComponent } from './subsidios/editsubsidio/editsubsidio.component';
import { AprobadoComponent } from './aprobado/aprobado.component';
import { PagadoComponent } from './pagado/pagado.component';



@NgModule({
  declarations: [
    PeriodoComponent,
    AprobadoresComponent,
    BeneficiosComponent,
    ListasubsidiosComponent,
    NewsubsidioComponent,
    EditsubsidioComponent,
    AprobadoComponent,
    PagadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(cebsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class CebsModule { }
