export class Proyecto {
    constructor(
        public estado: boolean,
        public fecha_inicio: Date,
        public nombre: string,
        public id_proyecto?: number,
        public id_usuario?: number
    ) { }
}
