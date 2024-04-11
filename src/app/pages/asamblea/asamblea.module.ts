import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsambleaMantComponent } from './asamblea-mant/asamblea-mant.component';
import { AsambleaRoutes } from './asamblea.routing';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AsistentesComponent } from './asistentes/asistentes.component';
import { ParticipacionComponent } from './participacion/participacion.component';
import { AsambleaComponent } from './asamblea.component';
import { DelegadosComponent } from './delegados/delegados.component';




@NgModule({
  declarations: [
    AsambleaMantComponent,
    AsistenciaComponent,
    AsistentesComponent,
    ParticipacionComponent,
    AsambleaComponent,
    DelegadosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AsambleaRoutes),
    NgbPaginationModule,
    
  ],
  providers:[
  ]
})
export class AsambleaModule { }
