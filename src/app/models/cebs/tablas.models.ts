import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class periodo{
    constructor(
        public ID_PERIODO:number,
        public ESTADO:string,
)
{}
}

export class aprobacion{
    constructor(
        public ID_APROBADOR:number,
        public APROBADOR:string,
        public ESTADO:string,
)
{}
}

export class beneficios{
    constructor(
        public ID_BENEFICIO:number,
        public BENEFICIO:string,
        public OBSERVACION:string,
        public ESTADO:string,
)
{}
}