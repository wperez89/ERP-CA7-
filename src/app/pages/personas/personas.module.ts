import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { PersonasRoutes } from './personas.routing';

import { PersonasComponent } from './personas.component';
import { PersonaNuevaComponent } from './persona-nueva/persona-nueva.component';
import { PersonaeditComponent } from './personaedit/personaedit.component';
import { ProfesionesComponent } from './profesiones/profesiones.component';
import { ProfesionalComponent } from './profesional/profesional.component';



@NgModule({
  declarations: [
    PersonasComponent,
    PersonaNuevaComponent,
    PersonaeditComponent,
    ProfesionesComponent,
    ProfesionalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PersonasRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    
  ],
  
})
export class PersonasModule { }
