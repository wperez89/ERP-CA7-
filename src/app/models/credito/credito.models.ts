import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class Operacion{
    constructor(
        public IDOPERACION:string,
        public CEDULA:string,
        public LINEA_CRED:string,
        public MONTO:Float32Array,
        public FECHA_FORMALIZACION:Date,  
        public GARANTIA:Int16Array,
        public PLAN_INVERSION:Int16Array,
        public ANALISTA:string,
        public TASA:Float32Array,
        public COMISION:Float32Array,
        public INTERESES_ANT:Float32Array,
    )
    {}
}

export class OperacionesVista{
    constructor(
        public IDOPERACION:string,
        public CEDULA:string,
        public NOMBRE:string,
        public LINEA_CREDITO:string,
        public FECHA_FORMALIZACION:Date, 
    )
    {}
}

export class tipoGarantia{
    constructor(
        public ID_GARANTIA: number,
        public GARANTIA: string
    )
    {}
}

export class tipoPlanInv{
    constructor(
        public COD_INV: number,
        public TIPO_INVERSION: string
    )
    {}
}

export class tipoLineaCredito{
    constructor(
        public COD_CRED: string,
        public LINEA_CREDITO: string
    )
    {}
}

export class productoCredito{
    constructor(
        public ID_PRODCRED: number,
        public PRODUCTO: string,
        public ESTADO: string,
    )
    {}
}
export class SolicitudCred{
    constructor(
        public ID_SOLICITUD: string,
        public  ID_CLIENTE:string,
        public ESTADO_ACTUAL:number,
        public NOMBRE:string,
        public FECHA:Date,
        public ESTADO_ACT_NOM:string
    )
    {}
}

export class ArchivosSolicitudCred{
    constructor(
        public documento: string,
        public tipoArchivo: string, 
        public nomDocumento: string, 
        public archivoName:string
    )
    {}
}
