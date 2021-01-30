export class Acuerdo {
    constructor(
        public detalle: string,
        public fecha_limite: Date,
        public estado: string,
        public id?: number,
        public id_usuario?: number,
        public nombre?: string
    ) { }

}