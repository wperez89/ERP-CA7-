import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { cargarLineaCreditos, cargarTipoGarantia, cargarTipoPlanInversion } from 'src/app/interfaces/cargar-credito.interface';
import { cargarNombrePersona } from 'src/app/interfaces/cargar-personas.interface';
import { Usuario } from 'src/app/models/User/usuario.models';
import { CreditoService } from 'src/app/services/credito.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-credit-new',
  templateUrl: './credit-new.component.html',
  styleUrls: ['./credit-new.component.scss']
})
export class CreditNewComponent implements OnInit {
  public garantia: cargarTipoGarantia[]
  public lineaCred: cargarLineaCreditos[];
  public inversion: cargarTipoPlanInversion[];
  public usuarios: Usuario[] = [];
  public persona: cargarNombrePersona[] = [];
  public creditForm : FormGroup;
  valorDecimal: number = 0.00;
  public cargando:boolean = false;

  constructor(private creditoService:CreditoService, private usuarioService:UsuarioService, 
    private personaService:PersonasService, private fb:FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute) { 
      this.creditForm= this.fb.group(
        {
          CEDULA:['',Validators.required],
          NOMBRE:['',Validators.required],
          IDOPERACION:['',Validators.required],
          LINEA_CRED:['',Validators.required],
          MONTO:['',Validators.required,],
          FECHA_FORMALIZACION:['',Validators.required],
          GARANTIA:['',Validators.required],
          PLAN_INVERSION:['',Validators.required],
          ANALISTA:['',Validators.required],
          TASA:['',Validators.required],
          COMISION:['',Validators.required],
          INTERESES_ANT:['',Validators.required],
        });
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=> this.cargarPersonas(id));
    this.cargarTipoGarantia();
    this.cargarLineaCredito();
    this.cargarPlanInversion();
    this.cargarUsuarios();
  }

  cargarPersonas(id:string)
    {
      this.cargando = true;
      this.personaService.getNombresPersonaID(id)
      .subscribe((nombre:any)=>
      {
        this.persona = nombre
        //console.log(this.persona)
        this.creditForm.patchValue({
          CEDULA:nombre.IDENTIFICACION,
          NOMBRE:nombre.NOMBRE})
      })
      this.cargando = false;
    }

  cargarTipoGarantia()
    {
      this.creditoService.cargarGarantias()
      
      .subscribe((garantia)=>
      {
       this.garantia = garantia
      })
    }
  
  cargarLineaCredito()
    {
      this.creditoService.cargarLineasCredito()
      
      .subscribe((lineas)=>
      {
       this.lineaCred = lineas
      })
    }

  cargarPlanInversion()
    {
      this.creditoService.cargarTipoInversion()
      
      .subscribe((inversion)=>
      {
       this.inversion = inversion
      })
    }
    
//Cargar Usuarios de Base de Datos
  cargarUsuarios()
    {
      this.usuarioService.cargarUsuariosActivos()
      .subscribe(({usuarios})=>
        {
          this.usuarios = usuarios;
        })
    }
  
//Guardar Operación de Crédito
  guardarOperacion()
    {
      //console.log(this.creditForm.value)
      this.creditoService.crearOperacion(this.creditForm.value)
    .subscribe((resp:any)=>{
    if(!resp.ok)
      if(this.creditForm.invalid)
      {
        //console.error(resp)
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else{
        errorDialog.fire(
          {
            text:(resp.msg)
          }
        )
      }
    else
    {
      SuccessDialog.fire(
      {
        title:(resp.msg)
      });

      this.router.navigate(['/credito']);
    }
    },
    (error) => { // Si sucede un error
        
      console.error(error);
    })
    }
}
