
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { RangoSalario, condicionLaboral, sectorLaboral } from 'src/app/interfaces/cargar-personas.interface';
import { Usuario } from 'src/app/models/User/usuario.models';
import { productoCredito } from 'src/app/models/credito/credito.models';
import { CreditoService } from 'src/app/services/credito.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { GlobalService } from 'src/app/services/global.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-cred',
  templateUrl: './solicitud-cred.component.html',
  styleUrls: ['./solicitud-cred.component.scss']
})
export class SolicitudCredComponent implements OnInit {
  solicitudForm:FormGroup;
  canales:[]=[];
  producto:productoCredito[]=[];
  usuario: Usuario;
  rangoSalario: RangoSalario;
  condicionLab:condicionLaboral;
  sectorLab:sectorLaboral;
  cargando:boolean = false;
  existe:boolean = false;
  cedula:string = '';
  requerido: boolean = false;
  editado:boolean = false;
  idSolicitud:string = '';
  client:string = '';
  asignado:string ='';
  monto = '';
  estado:string = '';

  constructor(private personaService:PersonasService, private fb:FormBuilder, private globalServicio:GlobalService,
    private creditoService:CreditoService, private router: Router, private activatedRoute:ActivatedRoute,
    private usuarioservice: UsuarioService, private cryptService:CryptoService) {
      this.usuario = usuarioservice.usuario;
    this.solicitudForm = this.fb.group(
      {
        IDENTIFICACION:['',Validators.required],
        NOMBRE:[{value:'',disabled:true},Validators.required],
        PRODUCTO:['',Validators.required],
        CANAL_COM:['',Validators.required],
        CONDICION_LAB:['',Validators.required],
        SECTOR_LAB:['',Validators.required],
        RANGO_SAL:['',Validators.required],
        ID_CLIENTE:['',Validators.required],
        MONTO:['',Validators.required],
        OBSERVACIONES:[''],
        ID_SOLICITUD:[''],
        FECHA:[{value:'',disabled:true}],
        ESTADO_ACTUAL:[{value:'',disabled:true}],
        USUARIO:[''],
        NOM_USER:[],
        ASIGNADO:[],
        RESPONSABLE:[{value:'',disabled:true}],
        EDITADO:[false]
      }
    )
   
  }

  ngOnInit(): void {
    this.cargarCanales();
    this.cargarProductos();
    this.cargarCondicionLab();
    this.cargarRangoSalario();
    this.cargarSectorLab();
    this.suscribeParametro();
    

  }

  suscribeParametro()
  {
    this.activatedRoute.params.subscribe((params)=>
    {
      if(params['id']&&params['estado']&&params['cliente'])
      {
        this.idSolicitud = this.cryptService.decrypt(params['id'])
        this.estado = params['estado'];
        this.client= this.cryptService.decrypt(params['cliente']);   
        //console.log(typeof this.estado)     
        this.cargarSolicitudID(this.idSolicitud,this.estado,this.client);
      }
    })
  }

  cargarAPICedula()
  {
    this.solicitudForm.reset;
    this.cedula = this.solicitudForm.get('IDENTIFICACION').value;
    this.personaService.getInfoLaboral(this.cedula).subscribe((resp:any)=>
    {
      if(resp.length > 0)
      {
        this.existe = true;
        //console.log(resp[0])
        const rango = resp[0].RANGO_SALARIO;
        const condLab = resp[0].CONDICION_LAB;
        const sectorLab = resp[0].SECTOR_LAB;
        if(typeof rango === 'number' && typeof condLab === 'number' && typeof condLab === 'number')
        {
          this.solicitudForm.patchValue({
            NOMBRE:resp[0].NOMBRE,
            ID_CLIENTE:resp[0].ID_PERSONA,
            RANGO_SAL:rango,
            CONDICION_LAB:condLab,
            SECTOR_LAB:sectorLab,
            USUARIO:this.usuario.ID_USUARIO
          })
        }
        else
        {
          Toast.fire(
            {
              text:("Favor Actualizar los datos Laborales"),
              timer:4000
            }
          )
          this.solicitudForm.reset();
          this.existe = false;
        }
      }
      else
      {
          errorDialog.fire(
            {
              text:("No existe Cedula"),
            }
          )
          this.existe = false;
      }
      
    })
  }

  guardarSolicitud()
  {
    //console.log(this.solicitudForm.value);
    //Si el formulario tiene Campos Inválidos
      if (this.solicitudForm.invalid) {
        this.requerido = true;
        Toast.fire({
          text:"Completar todos los campos Obligatorios"
        })
        return;
      }
    else
    {

        //console.log("Solicitud Nueva")
        this.creditoService.crearsolicitud(this.solicitudForm.value)
        .subscribe((resp:any)=>
        {
          //console.log(resp)
          SuccessDialog.fire(
            {
              title:(resp.msg)
            });
            this.solicitudForm.reset;
            this.router.navigate(['/credito/solicitudescred'])
        },
        (error) => { // Si sucede un error
          errorDialog.fire(
            {
              text:(error.msg)
            }
          )
        })

    }
  }

  //Canales de Comunicación
  cargarCanales()
  {
    this.cargando;
    this.globalServicio.cargarCanalesComunic().subscribe(
      (resp:any)=>
      {
        //console.log(resp)
        this.canales = resp;
      })
  }

  //Canales de Producto Creditos
  cargarProductos()
  {
    this.cargando;
    this.creditoService.cargarProductoCredito().subscribe(
      (resp:any)=>
      {
        //console.log(resp)
        this.producto = resp;
      })
  }

 //Tabla Rango de Salarios
  cargarRangoSalario() {
    this.cargando;
    this.personaService
      .cargarRangoSalarial()
      .subscribe((resp:any) => {
        this.rangoSalario = resp;
        //console.log(this.rangoSalario)
      });
  }

   //Tabla Condiciones Laborales
  cargarCondicionLab() {
    this.cargando;
    this.personaService
      .cargarCondicionLaboral()
      .subscribe((resp:any) => {
        this.condicionLab = resp;
        //console.log(this.condicionLab)
      });
  }

  //Tabla Sector Laboral
  cargarSectorLab() {
    this.cargando;
    this.personaService
      .cargarSectorLaboral()
      .subscribe((resp:any) => {
        this.sectorLab = resp;
        //console.log(this.sectorLab)
      });
  }

  cargarSolicitudID(id:string,estado:string,cliente:string)
  {
    this.cargando = true;
    this.creditoService.cargarSolicitudIDCredito(id,estado,cliente)
    .subscribe((resp:any)=>
    {
      //console.log(resp[0].FECHA)
      //console.log(resp.length)
      if(resp.length == 0)
      {
        this.usuarioservice.logOut();
      }
      else
      {

        const fecha = new Date(resp[0].FECHA)
        fecha.setHours(fecha.getHours() + 6);
        let hora = fecha.toLocaleString('es-CR',{ year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric',second:'numeric', hour12: true });
        
        this.editado = true;
        this.existe = true;
        this.solicitudForm .patchValue(
        {
          IDENTIFICACION:resp[0].IDENTIFICACION,
          NOMBRE:resp[0].NOMBRE,
          PRODUCTO:resp[0].PRODUCTO,
          CANAL_COM:resp[0].CANAL_COM,
          CONDICION_LAB:resp[0].CONDICION_LAB,
          SECTOR_LAB:resp[0].SECTOR_LAB,
          RANGO_SAL:resp[0].RANGO_SAL,
          ID_CLIENTE:resp[0].ID_CLIENTE,
          RESPONSABLE:resp[0].NOMBRE_ASIGNADO,
          ASIGNADO:resp[0].ASIGNADO,
          MONTO:resp[0].MONTO,
          OBSERVACIONES:resp[0].OBSERVACIONES,
          ID_SOLICITUD:resp[0].ID_SOLICITUD,
          FECHA:hora,
          ESTADO_ACTUAL:resp[0].ESTADO_ACT_NOM,
          EDITADO:true
        })
        if(this.editado)
        {
          this.solicitudForm.get('IDENTIFICACION').disable();
        }
        if(this.estado == '4' || this.estado == '5')
        {
          this.solicitudForm.disable();
        }
        this.cargando = false;
      }
      },error=>{
        this.usuarioservice.logOut();
      })
    }
    
  AsignarSolicitud()
  {
    //console.log(this.usuario)
    this.solicitudForm.patchValue({
      USUARIO:this.usuario.ID_USUARIO,
      NOM_USER:this.usuario.NOMBRE + ' ' + this.usuario.APELLIDO1 + ' ' + this.usuario.APELLIDO2
    })
    let respuesta:string = '';
    Swal.fire({
      title: "Desea Asignar Automáticamente la solicitud",
      text:"Si Indica NO, se asignará al usuario con la sesión iniciada",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "SI",
      denyButtonText: "NO",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        respuesta = 'S';
        this.creditoService.asignarSolicitud(respuesta,this.solicitudForm.value)
      .subscribe((resp:any)=>
      {
        //console.log(resp)
        Swal.fire("", resp.msg, "success");
        this.activatedRoute.params.subscribe((params)=>
        {
          this.router.navigate([`//credito/solicitud/edit/${params['id']}/2/${params['cliente']}`]) 
        }
        )
      })
      } else if (result.isDenied) {
        respuesta = 'N';        
        this.creditoService.asignarSolicitud(respuesta,this.solicitudForm.value)
      .subscribe((resp:any)=>
      {
        //console.log(resp)
        Swal.fire("", resp.msg, "success");
        this.activatedRoute.params.subscribe((params)=>
        {
          this.router.navigate([`//credito/solicitud/edit/${params['id']}/2/${params['cliente']}`]) 
        }
        )
      })
      }
      
    });
  }

  navigateTransacciones()
  {
    const tipo = this.cryptService.encrypt("CREDITO");
    const id = this.cryptService.encrypt(this.solicitudForm.get('ID_SOLICITUD').value);
    const cliente = this.cryptService.encrypt(this.solicitudForm.get('ID_CLIENTE').value);
    const asignado = this.cryptService.encrypt(this.solicitudForm.get('ASIGNADO').value);
    //console.log(this.solicitudForm.get('ASIGNADO').value)
    this.router.navigate([`//credito/transacciones/${cliente}/${this.estado}/${id}/${tipo}/${asignado}`])
  }

  navigateDocuments()
  {
    const tipo = this.cryptService.encrypt("CREDITO");
    const id = this.cryptService.encrypt(this.solicitudForm.get('ID_SOLICITUD').value);
    const cliente = this.cryptService.encrypt(this.solicitudForm.get('ID_CLIENTE').value);
    this.router.navigate([`//credito/documents/${tipo}/${id}/${this.estado}/${cliente}`])
  }
}
