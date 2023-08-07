import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class Estados{
    constructor(
        public ID_ESTADO:string,
        public ESTADO:string,
)
{}
}

export class Provincia{
    constructor(
        public ID_PROVINCIA:number,
        public PROVINCIA:string,
)
{}
}

export class Canton{
    constructor(
        public ID_CANTON:number,
        public ID_PROVINCIA:number,
        public CANTON:string
)
{}
}

export class Distrito{
    constructor(
        public ID_DISTRITO:number,
        public ID_CANTON:number,
        public ID_PROVINCIA:number,
        public DISTRITO:string
)
{}
}

export class Tbl_Profesiones{
    constructor(
        public ID_PROFESION:number,
        public PROFESION:string,
        public ESTADO:string,
    )
    {}
}