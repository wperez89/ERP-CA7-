export class AvaluoLista{
    constructor(
        public IDENTIFICACION:string,
        public ID:string,
        public NOMBRE:string,
        public DATE_CREATED:Date,
        public ID_AVALUO:string,
        public CREATED:string, 
        public ESTADO:string, 
    )
    {}
}

export class infoAvaluos{
    constructor(
        IDENTIFICACION: string,
        ID_AVALUO: string,
        ID_CLIENTE:string,
        CREATED: Date,
        PROVINCIA: number,
        CANTON: number,
        DISTRITO: number,
        NUM_FINCA:string,
        AREA_TERRENO: number,
        AREA_CONSTRUC: number,
        MONTO_EDIFICIO: Float32Array,
        MONTO_TERRENO: Float32Array,
        MONTO_GARANTIA: Float32Array,
        DOCUMENTO: string,
        ESTADO:string
    )
    {}
}