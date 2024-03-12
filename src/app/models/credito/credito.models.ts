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
