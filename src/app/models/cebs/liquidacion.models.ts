import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class liquidacion_Solicitud{
    constructor(
        public ID_PAGO:number,
        public ID_REFERENCIA:string,
        public NUM_COMPROBANTE:string,
        public FECHA_PAGO:Date,
        public USUARIO:string,
        public OBSERVACION:string,
        public DOCUMENTO:string,
        public ESTADO:string,
        public PAGADO:string,
)
{}
}