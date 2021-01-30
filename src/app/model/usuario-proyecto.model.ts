export class UsuarioProyecto {
    constructor(
        public id_usuario: number,
        public id_proyecto: number,
        public estado: boolean,
        public nombre: string,
        public apellido: string,
        public id_usuario_proyecto?: number
    ) { }
}
