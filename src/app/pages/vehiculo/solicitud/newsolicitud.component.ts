import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  SuccessDialog,
  Toast,
  errorDialog,
} from "src/app/helpers/Notificaciones";
import { Usuario } from "src/app/models/User/usuario.models";
import { areaDocumental } from "src/app/models/archivoDigital/tablasArchivoDig.models";
import {
  MotivoSalidaVeh,
  conductor,
  estadoSolVeh,
  pasajerosVeh,
} from "src/app/models/vehiculos/tablasVehiculo.models";
import { ArchivoDigitalService } from "src/app/services/archivo-digital.service";
import { PersonasService } from "src/app/services/personas.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { VehiculoService } from "src/app/services/vehiculo.service";
import { SharedVehService } from "../shared-veh.service";
import { CryptoService } from "src/app/services/crypto.service";

@Component({
  selector: "app-solicitud",
  templateUrl: "./newsolicitud.component.html",
  styleUrls: ["./solicitud.component.scss"],
})
export class NewSolicitudComponent implements OnInit {
  public solicitudForm: FormGroup;
  public pasajeroForm: FormGroup;
  public usuario: Usuario;
  public chofer: conductor[] = [];
  public AreaDoc: areaDocumental[] = [];
  public MotSalidVeh: MotivoSalidaVeh[] = [];
  public estados: estadoSolVeh[] = [];
  public pasajero: pasajerosVeh[] = [];
  public pagina: number = 1;
  public pagesize: number = 10;
  public cargando: boolean = true;
  public viajanteSelect: string = "NO";
  public editado: boolean = false;
  public idEstado: number;
  public idSolicitud: string = "";
  public idSolicitante: string = "";
  public idPasajero = "";

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private archivoService: ArchivoDigitalService,
    private usuarioservice: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private personaService: PersonasService,
    private sharedVeh: SharedVehService,
    private cryptoService: CryptoService
  ) {
    this.solicitudForm = this.fb.group({
      NUM_SOLICITUD: new FormControl({ value: "", disabled: true }),
      ID_SOLICITANTE: ["", Validators.required],
      AREA: ["", Validators.required],
      OBSERVACIONES: [""],
      FECHA_REGRESO: ["", Validators.required],
      FECHA_SALIDA: ["", Validators.required],
      DESTINO: ["", Validators.required],
      MOTIVO_SALIDA: ["", Validators.required],
      CONDUCTOR: ["", Validators.required],
      ESTADO: new FormControl({ value: "", disabled: true }),
      EDITADO: [false],
    });
    this.usuario = usuarioservice.usuario;
  }

  ngOnInit(): void {
    this.cargarConductores();
    this.getArea();
    this.getMotivoSalidaVeh();
    this.activatedRoute.params.subscribe((params) => {
      if (params["num_sol"] && params["estado"] && params["id_solic"]) {
        this.editado = true;
        this.idEstado = params["estado"];
        this.idSolicitud = this.cryptoService.decrypt(params["num_sol"]);
        this.idSolicitante = this.cryptoService.decrypt(params["id_solic"]);
        this.cargarEstados();
        this.cargarSolicitudID(
          this.idEstado,
          this.idSolicitud,
          this.idSolicitante
        );
      }
    });
    //console.log(this.idEstado)
  }

  cargarConductores() {
    this.cargando = true;
    this.vehiculoService.cargarChofer().subscribe((resp: any) => {
      //console.log(resp);
      this.chofer = resp;
      this.cargando = false;
    });
  }

  cargarEstados() {
    this.cargando = true;
    this.vehiculoService.cargarEstadosTodos().subscribe((resp: any) => {
      //console.log(resp);
      this.estados = resp;
      this.cargando = false;
    });
  }

  getMotivoSalidaVeh() {
    this.cargando = true;
    this.vehiculoService.cargarMotivoSalidaVeh().subscribe((resp: any) => {
      //console.log(resp);
      this.MotSalidVeh = resp;
      this.cargando = false;
    });
  }

  getArea() {
    this.cargando = true;
    this.archivoService.cargarAreaDoc().subscribe((resp: any) => {
      //console.log(resp);
      this.AreaDoc = resp;
      this.cargando = false;
    });
  }
  cargarSolicitudID(estado: number, id: string, solicitante: string) {
    this.cargando = true;
    this.vehiculoService
      .cargarSolicitudID(estado, id, solicitante)
      .subscribe((resp: any) => {
        //console.log(resp);
        let solicitud = resp[0];
        const fechaRegreso = solicitud.FECHA_REGRESO.substring(
          0,
          solicitud.FECHA_REGRESO.lastIndexOf(".")
        );
        const fechaRegresoFormateada = fechaRegreso.replace("T", " ");
        const fechaSalida = solicitud.FECHA_SALIDA.substring(
          0,
          solicitud.FECHA_SALIDA.lastIndexOf(".")
        );
        const fechaSalidaFormateada = fechaSalida.replace("T", " ");
        this.solicitudForm.patchValue({
          NUM_SOLICITUD: solicitud.NUM_SOLICITUD,
          ID_SOLICITANTE: solicitud.ID_SOLICITANTE,
          AREA: solicitud.AREA,
          OBSERVACIONES: solicitud.OBSERVACIONES,
          FECHA_REGRESO: fechaRegresoFormateada,
          FECHA_SALIDA: fechaSalidaFormateada,
          DESTINO: solicitud.DESTINO,
          MOTIVO_SALIDA: solicitud.MOTIVO_SALIDA,
          CONDUCTOR: solicitud.CONDUCTOR,
          ESTADO: solicitud.ESTADO,
          EDITADO: this.editado,
        });
        this.cargando = false;
      });
  }

  guardarSolicitud() {
    {
      this.solicitudForm.patchValue({
        ID_SOLICITANTE: this.usuario.ID_USUARIO,
      });
      this.solicitudForm.enable();
      this.vehiculoService.crearSolicitud(this.solicitudForm.value).subscribe(
        (resp: any) => {
          if (this.solicitudForm.invalid) {
            //console.error(resp)
            Toast.fire({
              text: resp.msg,
            });
            return;
          }
          if (!resp.ok) {
            errorDialog.fire({
              text: resp.msg,
            });
          } else {
            SuccessDialog.fire({
              title: resp.msg,
            });
            this.solicitudForm.reset();
            this.sharedVeh.cargarEstadosSolicitud();
            this.router.navigateByUrl("//vehiculos/solicitud");
          }
        },
        (error) => {
          // Si sucede un error
          errorDialog.fire({
            text: error.msg,
          });
          //console.error(error);
        }
      );
    }
  }

  changeViajantes() {
    this.cargando = true;
    this.viajanteSelect = this.solicitudForm.get("ACOMPAÑANTE").value;
    this.cargando = false;
    this.pasajeroForm = this.fb.group({
      ID_PASAJERO: [""],
      CEDULA: ["", Validators.required],
      ID_PERSONA: [""],
      ID_VIAJE: ["", Validators.required],
      OBSERVACION: [""],
      NOMBRE: [""],
      ESTADO: [""],
    });
  }

  modalOpenBackdrop(modal: any) {
    this.modalService.open(modal, {
      backdrop: false,
      centered: true,
      //fullscreen:true
      size: "xl",
    });
  }

  cerrarModal(modalEdit: any) {
    this.pasajeroForm.reset();
    this.modalService.dismissAll(modalEdit);
    //this.id = '';
    this.editado = false;
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  mostrarPersona() {
    this.idPasajero = this.pasajeroForm.get("CEDULA").value;
    //console.log(this.idPasajero.length)
    this.personaService
      .getNombresPersonabyCedula(this.idPasajero)
      .subscribe((resp: any) => {
        this.pasajero = resp.persona[0];
        console.log(this.pasajero);
        this.pasajeroForm.patchValue({
          NOMBRE: resp.persona[0].NOMBRE,
          ID_PERSONA: resp.persona[0].ID,
          ESTADO: "A",
        });
      });
  }

  notificar(id: string) {
    this.cargando = true;
    this.vehiculoService.enviarNotificacion(id).subscribe((resp: any) => {
      if (!resp.ok) {
        Toast.fire({
          text: resp.msg,
        });
      } else {
        SuccessDialog.fire({
          text: resp.msg,
        });
      }
      this.cargando = false;
    });
  }

  getPasajeros() {
    const idSolicitud = this.cryptoService.encrypt(this.idSolicitud);
    const idSolicitante = this.cryptoService.encrypt(this.idSolicitante);

    this.router.navigate([
      `//vehiculos/solicitud/pasajero/${idSolicitud}/${this.idEstado}/${idSolicitante}`,
    ]);
  }

  getTransacciones() {
    const idSolicitud = this.cryptoService.encrypt(this.idSolicitud);
    const idSolicitante = this.cryptoService.encrypt(this.idSolicitante);

    this.router.navigate([
      `//vehiculos/solicitud/transactions/${idSolicitud}/${this.idEstado}/${idSolicitante}`,
    ]);

  }
}
