import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/models/personas/persona.models';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  public pagina: number = 1;
  public pagesize: number = 10;
  public personas: Persona[] = [];
  public personasTemp: Persona[] = [];
  public cargando: boolean = true;
  public filtro = '';
  modal: NgbModalRef;

  constructor(private personaservice:PersonasService) { }

  ngOnInit(
  ): void {
    this.cargarPersonas();
  }
   //Cargar Usuarios de Base de Datos
   cargarPersonas()
   {
     this.cargando = true;
     this.personaservice.cargarPersonas()
     .subscribe(({personas})=>
       {
        //console.log(personas);
         this.personas = personas;
         this.personasTemp = personas;
         this.cargando = false;
       })
   }

   filtrar()
   {
     if(this.filtro)
     {
       var filter = new RegExp(this.filtro,'i');
       this.personas = this.personasTemp.filter(item=>filter.test(item.NOMBRE)||filter.test(item.APELLIDO1)||
       filter.test(item.APELLIDO2)||filter.test(item.IDENTIFICACION));
     }
     else
     {
       this.personas = this.personasTemp;
     }
   }
}
