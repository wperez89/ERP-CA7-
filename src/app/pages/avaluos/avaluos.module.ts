import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaluosComponent } from './avaluos.component';
import { AvaluoeditComponent } from './avaluoedit/avaluoedit.component';
import { AvaluonewComponent } from './avaluonew/avaluonew.component';
import { RouterModule } from '@angular/router';
import { AvaluosRoutes } from './avaluos.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { FacturaComponent } from './factura/factura.component';
import { RepCotizacionesComponent } from './reportes/rep-cotizaciones/rep-cotizaciones.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { GroupByPipe } from './group-by.pipe';

@NgModule({
  declarations: [
    AvaluosComponent,
    AvaluoeditComponent,
    AvaluonewComponent,
    CotizacionComponent,
    FacturaComponent,
    RepCotizacionesComponent,
    //GroupByPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AvaluosRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxDatatableModule
  ],
  providers: [CotizacionComponent]
})
export class AvaluosModule { }
