import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoComponent } from './vehiculo.component';
import { RouterModule } from '@angular/router';

import { VehiculosRoutes } from './vehiculo.routing';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { FlotillaComponent } from './flotilla/flotilla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ChoferComponent } from './chofer/chofer.component';
import { AprobadorComponent } from './aprobador/aprobador.component';
import { NewSolicitudComponent } from './solicitud/newsolicitud.component';
import { PasajeroComponent } from './solicitud/pasajero.component';
import { TransaccionComponent } from './solicitud/transaccion.component';

@NgModule({
  declarations: [
    VehiculoComponent,
    SolicitudComponent,
    NewSolicitudComponent,
    FlotillaComponent,
    ChoferComponent,
    AprobadorComponent,
    PasajeroComponent,
    TransaccionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(VehiculosRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class VehiculoModule { }
