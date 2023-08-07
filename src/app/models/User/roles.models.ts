import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class Roles{
    constructor(
        public ROL:string,
        public DESCRIPCION:string,
        public ID_ROL?:number,
)
{}

}