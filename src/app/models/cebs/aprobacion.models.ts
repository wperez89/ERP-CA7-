import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class aprobacion_Solicitud{
    constructor(
        public ID_APROBACION:number,
        public ID_REFERENCIA:string,
        public NUM_SESION:number,
        public FECHA:Date,
        public TIPO_APROB:number,
        public OBSERVACION:string,
        public ESTADO:string,
)
{}
}