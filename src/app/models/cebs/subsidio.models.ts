import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class subsidioMed{
    constructor(
        public ID_SUBSIDIO:string,
        public ID_PERSONA:string,
        public MONTO_FACT:Float32Array,
        public MONTO_SUBSIDIO:Float32Array,
        public FECHA:Date,
        public AL_DIA:boolean,
        public USUARIO_RECIBE:string,
        public TIPO_BENEFICIO:number,
        public PERIODO:number,
        public APROBADO:boolean,
        public PAGADO:boolean,
        public OBSERVACION:string,
        public DOCUMENTO:string,
        public ESTADO:string,
        public NOMBRE:string,
        public EDITADO:boolean
)
{}
}

export class listaSubsidioMed{
    constructor(
        public ID_SUBSIDIO:string,
        public IDENTIFICACION:string,
        public NOMBRE:string,
        public FECHA:Date,
        public BENEFICIO:string,
        public PERIODO:number,
        public APROBADO:boolean,
        public PAGADO:boolean,
        public ESTADO:string,
)
{}
}
