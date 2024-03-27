import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  aprobadoresSolVeh,
  estadoSolVeh,
  trscnSolicitudVeh,
} from "src/app/models/vehiculos/tablasVehiculo.models";
import { VehiculoService } from "src/app/services/vehiculo.service";
import { Usuario } from "src/app/models/User/usuario.models";
import { UsuarioService } from "src/app/services/usuario.service";
import { SuccessDialog, Toast, errorDialog } from "src/app/helpers/Notificaciones";
import { CryptoService } from "src/app/services/crypto.service";

@Component({
  selector: "app-transaccion",
  templateUrl: "./transaccion.component.html",
  styles: [],
})
export class TransaccionComponent implements OnInit {
  public trscnSolVehForm: FormGroup;
  public estadosTrscn: estadoSolVeh[] = [];
  public usuario: Usuario;
  public transaccion: trscnSolicitudVeh[] = [];
  aprobador:aprobadoresSolVeh[] = [];
  public cargando: boolean = true;
  public idSolicitud: string = "";
  public estadoAct: string;
  public editado: boolean = false;
  public id: number;
  public nomEstAnterior: string = "";
  public autorizado: boolean = false;

  constructor(
    private vehiculoService: VehiculoService,
    private activatedRoute: ActivatedRoute,
    public modalService: NgbModal,
    private fb: FormBuilder,
    private usuarioservice: UsuarioService,
    private cryptoService:CryptoService,
    private router:Router
  ) {
    this.trscnSolVehForm = this.fb.group({
      ID_TRAN: [""],
      NUM_SOLICITUD: ["", Validators.required],
      NOM_USER: [""],
      ESTADO_ANT: ["", Validators.required],
      ESTADO_ACT: ["", Validators.required],
      DETALLE: ["", Validators.required],
      USUARIO: ["", Validators.required],
      FECHA: [""],
      EDITADO: [false],
    });
    this.usuario = usuarioservice.usuario;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["num_sol"] && params["estado"]) {
        this.idSolicitud = this.cryptoService.decrypt(params["num_sol"]);
        this.estadoAct = params["estado"];
      }
    });
    this.mostrarTransacciones();
    this.cargarAprobadores();
  }

  mostrarTransacciones() {
    this.cargando = true;
    this.vehiculoService
      .cargartrscnSolVehID(this.idSolicitud)
      .subscribe((resp: any) => {
        this.transaccion = resp;
        this.cargando = false;
      });
  }

  mostrarTransaccionesID(modal: any, id: number) {
    this.cargando = true;
    this.editado = true;
    this.vehiculoService.cargarIDTrscn(id).subscribe((resp: any) => {
      //console.log(resp)
      this.id = resp[0].ID_TRAN;
      let fecha = new Date(resp[0].FECHA);
      fecha.setHours(fecha.getHours() + 6);
      let hora = fecha.toLocaleString();

      this.trscnSolVehForm.patchValue({
        NUM_SOLICITUD: resp[0].NUM_SOLICITUD,
        EDITADO: this.editado,
        ESTADO_ANT: resp[0].ESTADO_VIEJO,
        ESTADO_ACT: resp[0].ESTADO_NUEVO,
        DETALLE: resp[0].DETALLE,
        FECHA: hora,
        ID_TRAN: resp[0].ID_TRAN,
        USUARIO: resp[0].USUARIO,
        NOM_USER: resp[0].NOM_USER,
      });
      this.id = resp[0].ID_TRAN;
    },
    (error) => { // Si sucede un error
      errorDialog.fire(
        {
          text:(error.msg)
        }
        )
        this.cerrarModal(modal);
      }
      );
      this.trscnSolVehForm.disable();
    this.modalService.open(modal, {
      backdrop: false,
      centered: true,
      size: "lg",
    });
    this.cargando = false;
  }

  cargarAprobadores()
  {
    this.cargando;
    this.vehiculoService.cargarAprobadores('A')
    .subscribe((resp:any)=>
    {
      this.aprobador = resp;
      this.cargando = false;
      for (let i = 0; i < this.aprobador.length; i++) {
        if (this.aprobador[i].APROBADOR === this.usuario.ID_USUARIO) {
          this.autorizado = true;
          break;
        }
      }
    })
  }

  cargarEstadosTransaccion(modal: any) {
    this.cargando = true;
    this.vehiculoService.cargarEstadosTodos().subscribe((resp: any) => {
      if(this.transaccion.length > 0)
      {
        this.estadosTrscn = resp;
      this.estadosTrscn = this.estadosTrscn.filter(
        (item) => item.IDESTADO !== 6
      );
      const estado = this.estadosTrscn.find(
        (item) => item.IDESTADO === parseInt(this.estadoAct)
      );
      this.nomEstAnterior = estado.NOMBRE;
      this.trscnSolVehForm.patchValue({
        ESTADO_ANT: this.nomEstAnterior,
        USUARIO: this.usuario.ID_USUARIO,
        NUM_SOLICITUD: this.idSolicitud,
      });
      }
      else
      {
        errorDialog.fire(
          {
            text:("Consulte al Administrador")
          }
          )
          this.cerrarModal(modal);  
      }
      this.cargando = false;
    },
    (error) => { // Si sucede un error
      errorDialog.fire(
        {
          text:(error.msg)
        }
        )
      });
  }

  createtrscnSol(modal: any) {
    this.cargando;
    this.trscnSolVehForm.patchValue({
      ESTADO_ANT: this.estadoAct,
      USUARIO: this.usuario.ID_USUARIO,
      EDITADO: false,
    });
    const estadoNuevo = this.trscnSolVehForm.get("ESTADO_ACT").value;
    //console.log(estadoact)
    if (this.trscnSolVehForm.invalid) {
      Toast.fire({
        text: "Completar Información del Formulario",
      });
      return;
    }
    //console.log(this.documentDigitalForm.value)
    this.vehiculoService
      .crearTransaccionSolVeh(this.trscnSolVehForm.value)
      .subscribe((resp: any) => {
        //console.log(resp)
        if (!resp.ok) {
          Toast.fire({
            text: resp.msg,
          });
        } else {
          SuccessDialog.fire({
            text: resp.msg,
          });
          this.cerrarModal(modal);
          this.mostrarTransacciones();
          this.cargando = false;;
          this.activatedRoute.params.subscribe((params) => {
          this.router.navigate([
            `//vehiculos/solicitud/transactions/${params["num_sol"]}/${estadoNuevo}/${params["id_solic"]}`,
          ]);
        })
        this.trscnSolVehForm.reset();
        }
      },
      (error) => { // Si sucede un error
        errorDialog.fire(
          {
            text:(error.msg)
          }
          )
          this.cerrarModal(modal);
        });
  }

  modalOpenBackdrop(modal: any) {
    this.modalService.open(modal, {
      backdrop: false,
      centered: true,
      //fullscreen:true
      size: "xl",
    });
    this.cargarEstadosTransaccion(modal);
  }

  cerrarModal(modalEdit: any) {
    this.trscnSolVehForm.reset();
    this.modalService.dismissAll(modalEdit);
    this.editado = false;
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
}
