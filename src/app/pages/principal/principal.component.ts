import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Acuerdo } from 'src/app/model/acuerdo.model';
import { Proyecto } from 'src/app/model/proyecto.model';
import { UsuarioProyecto } from 'src/app/model/usuario-proyecto.model';
import { PrincipalService } from 'src/app/services/principal.service';
import { Usuario } from 'src/app/model/usuario.model';
import { formatDate } from '@angular/common'
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
declare function customInitFunction();
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent implements OnInit {

  @ViewChild('tablaPendientes') tablaPendientes: ElementRef;

  public proyectoForm = this.fb.group({
    nombre: ['', [Validators.required]],
    fecha_inicio: ["", [Validators.required]],
    estado: ['', [Validators.required]]
  });
  public acuerdoForm = this.fb.group({
    detalle: ['', [Validators.required]],
    fecha_limite: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    fecha_creacion: ['', [Validators.required]],
    id_usuario: ['', [Validators.required]]
  });
  public usuarioProyectoForm = this.fb.group({
    id_usuario: [, [Validators.required]]
  });
  public usuarioLista: number;
  public usuarioAcuerdo: number;
  public estadoAcuerdo: string;
  public proyectoDetalle: Proyecto = new Proyecto(true, new Date(), "");

  public acuerdos: Acuerdo[] = [];
  public proyectos: Proyecto[] = [];
  public usuariosProyecto: UsuarioProyecto[] = [];
  public usuarios: Usuario[] = [];
  public id_usuario: number;

  public mensaje: string;
  public visible: string = 'd-none';
  public mensajeUsuarioProyecto: string;
  public visibleUsuarioProyecto: string = 'd-none';
  public mensajeProyecto: string;
  public visibleProyecto: string = 'd-none';
  public visibleProyectoCreado: string = 'd-none';
  public mensajeProyectoCreado: string;
  public botonEditarProyecto: string = 'd-none';

  public mensajeAcuerdo: string;
  public visibleAcuerdo: string = 'd-none';
  public visibleAcuerdoCreado: string = 'd-none';
  public mensajeAcuerdoCreado: string;
  public activoUsuario = {};
  public allUsuario = {};
  public restoAcuerdos = {};
  public allAcuerdo = {};



  constructor(public route: Router, public principalService: PrincipalService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    customInitFunction();
    this.validarToken();
    this.obtenerUsuarios();
    localStorage.removeItem('project');

  }
  cambiarProyecto(valor) {
    localStorage.setItem('project', valor.target.value);
    this.obtenerAcuerdosRestantes();
    this.obtenerUsuariosProyectoActivos();
    this.cargarProyecto();
    if (valor.target.value.length > 10) {
      this.botonEditarProyecto = 'd-none';
    } else {
      this.botonEditarProyecto = 'd-flex'
    }
  }
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('project');
    this.route.navigateByUrl('/login');
  }
  obtenerAcuerdos() {
    this.principalService.obtenerAcuerdos()
      .subscribe(resp => {
        this.acuerdos = resp;
        this.restoAcuerdos = { 'color': 'black' };
        this.allAcuerdo = { 'background-color': '#E9E7E7', 'color': 'black' };
        this.visible = 'd-none';
      }, (err) => {
        this.mensaje = err.error.msg;
        this.visible = '';
        this.acuerdos = [];
      });
  }
  obtenerAcuerdosRestantes() {
    this.principalService.obtenerAcuerdosRestantes()
      .subscribe(resp => {
        this.acuerdos = resp;
        this.restoAcuerdos = { 'background-color': '#E9E7E7', 'color': 'black' };
        this.allAcuerdo = { 'color': 'black' };
        this.visible = 'd-none';
      }, (err) => {
        this.mensaje = err.error.msg;
        this.visible = '';
        this.acuerdos = [];
      });
  }

  obtenerProyectosPorUsuario() {
    this.principalService.obtenerProyectosPorUsuario(this.id_usuario)
      .subscribe((resp: any) => {
        this.proyectos = resp.data
      })
  }

  obtenerUsuariosProyecto() {
    this.principalService.obtenerUsuariosProyecto()
      .subscribe(resp => {
        this.usuariosProyecto = resp;
        this.activoUsuario = { 'color': 'black' };
        this.allUsuario = { 'background-color': '#E9E7E7', 'color': 'black' };
        this.visible = 'd-none';
      }, (err) => {
        this.mensaje = err.error.msg;
        this.visible = '';
        this.usuariosProyecto = [];
      });
  }
  obtenerUsuariosProyectoActivos() {
    this.principalService.obtenerUsuariosProyectoActivos()
      .subscribe(resp => {
        this.usuariosProyecto = resp;
        this.activoUsuario = { 'background-color': '#E9E7E7', 'color': 'black' };
        this.allUsuario = { 'color': 'black' };
        this.visible = 'd-none';
      }, (err) => {
        this.mensaje = err.error.msg;
        this.visible = '';
        this.usuariosProyecto = [];
      });
  }

  async validarToken() {
    const payload = await this.principalService.validarToken()
      .toPromise();
    this.id_usuario = payload.id_usuario;
    this.obtenerProyectosPorUsuario();
    // this.cargarUsuarios();
  }
  crearProyecto() {
    this.proyectoForm.value.id_usuario = this.id_usuario
    this.principalService.crearProyecto(this.proyectoForm.value)
      .subscribe((resp: any) => {
        this.crearUsuarioProyectoInicio(resp.id_proyecto);
        this.validarToken();
        this.visibleProyecto = 'd-none';
        this.visibleProyectoCreado = 'd-flex';
        this.mensajeProyectoCreado = resp.msg;
      }, (error) => {
        this.mensajeProyecto = error.error.msg;
        this.visibleProyecto = '';
        this.visibleProyectoCreado = 'd-none';
      })
  }

  crearUsuarioProyecto() {
    this.usuarioProyectoForm.value.id_usuario = this.usuarioLista;
    this.principalService.crearUsuarioProyecto(this.usuarioProyectoForm.value)
      .subscribe(resp => {
        this.obtenerUsuariosProyecto();
        this.visibleUsuarioProyecto = 'd-none';
      }, (error) => {
        this.mensajeUsuarioProyecto = error.error.msg;
        this.visibleUsuarioProyecto = '';
      });
  }

  crearUsuarioProyectoInicio(id: number) {
    this.usuarioProyectoForm.value.id_usuario = this.usuarioLista;
    this.principalService.crearUsuarioProyectoInicio(this.usuarioProyectoForm.value, id)
      .subscribe(resp => {
        // this.obtenerUsuariosProyecto();
        this.validarToken();
        this.visibleUsuarioProyecto = 'd-none';
      }, (error) => {
        this.mensajeUsuarioProyecto = error.error.msg;
        this.visibleUsuarioProyecto = '';
      });
  }

  obtenerUsuarios() {
    this.principalService.obtenerUsuarios()
      .subscribe(resp => {
        this.usuarios = resp;
        console.log(this.usuarios);
      })
  }
  seleccionarUsuario(valor) {
    const usuarioFiltro = this.usuarios.filter(u => valor.target.value === u.nombre_apellido);
    if (usuarioFiltro.length > 0) {
      this.usuarioLista = usuarioFiltro[0].id_usuario;
    } else {
      this.usuarioLista = 0;
    }
  }

  cambiarResponsable(id) {
    this.usuarioAcuerdo = id.target.value;
  }

  cambiarEstado(estado) {
    this.estadoAcuerdo = estado.target.value;
  }

  crearAcuerdo() {
    this.acuerdoForm.value.fecha_creacion = new Date();
    this.acuerdoForm.value.id_usuario = this.usuarioAcuerdo;
    this.acuerdoForm.value.estado = this.estadoAcuerdo;
    this.principalService.crearAcuerdo(this.acuerdoForm.value)
      .subscribe((resp: any) => {
        this.acuerdoForm.setValue({ detalle: '', fecha_limite: '', estado: '', fecha_creacion: '', id_usuario: '' });
        // this.validarToken();
        this.obtenerAcuerdosRestantes();
        this.visibleAcuerdo = 'd-none';
        this.mensajeAcuerdo = '';
      }, (error) => {
        this.mensajeAcuerdo = error.error.msg;
        this.visibleAcuerdo = '';
      });
  }

  cambiarEstadoUsuarioProyecto(usuarioProyecto) {
    this.principalService.cambiarEstadoUsuarioProyecto(usuarioProyecto.id_usuario_proyecto)
      .subscribe(resp => {
      });
  }

  actualizarProyecto() {
    this.principalService.actualizarProyecto(this.proyectoForm.value)
      .subscribe((resp: any) => {
        this.obtenerProyectosPorUsuario();
        this.validarToken();
        this.visibleProyecto = 'd-none';
        this.visibleProyectoCreado = 'd-flex';
        this.mensajeProyectoCreado = resp.msg;
      }, (error) => {
        this.mensajeProyecto = error.error.msg;
        this.visibleProyecto = '';
        this.visibleProyectoCreado = 'd-none';
      });
  }

  cargarProyecto() {
    this.principalService.obtenerProyecto()
      .pipe(
        delay(100)
      )
      .subscribe(resp => {
        let { nombre, fecha_inicio, estado } = resp.data[0];
        fecha_inicio = new Date(fecha_inicio).setDate((new Date(fecha_inicio)).getDate() + 1);
        fecha_inicio = formatDate(new Date(fecha_inicio), 'yyyy-MM-dd', 'es-ES');
        this.proyectoForm.setValue({ nombre, fecha_inicio, estado })
      }, (error) => {

      });
  }

  borrarDatosProyecto() {
    this.proyectoForm.setValue({ nombre: '', fecha_inicio: '', estado: '' });
    this.visibleProyecto = 'd-none'
    this.visibleProyectoCreado = 'd-none'
  }

  borrarDatosAcuerdo() {
    this.acuerdoForm.setValue({ detalle: '', fecha_limite: '', estado: '', id_usuario: '', fecha_creacion: '' });
    this.visibleAcuerdo = 'd-none';
    this.visibleAcuerdoCreado = 'd-none';
    // this.validarToken();
  }

  actualizarAcuerdo() {
    this.principalService.actualizarAcuerdo(this.acuerdoForm.value)
      .subscribe((resp: any) => {
        this.visibleAcuerdo = 'd-none';
        this.visibleAcuerdoCreado = 'd-flex';
        this.mensajeAcuerdoCreado = resp.msg;
        // this.validarToken();
        this.obtenerAcuerdos();
      }, (error) => {
        this.mensajeAcuerdo = error.error.msg;
        this.visibleAcuerdo = '';
        this.visibleAcuerdoCreado = 'd-none';
      })
  }

  incluirIdAcuerdoLS(acuerdo) {
    localStorage.setItem('acuerdo', acuerdo.id_acuerdo);
    acuerdo.fecha_limite = new Date(acuerdo.fecha_limite).setDate((new Date(acuerdo.fecha_limite)).getDate() + 1);
    acuerdo.fecha_limite = formatDate(new Date(acuerdo.fecha_limite), 'yyyy-MM-dd', 'es-ES');
    acuerdo.id_usuario = parseInt(acuerdo.id_usuario);
    this.acuerdoForm.setValue({
      detalle: acuerdo.detalle, fecha_limite: acuerdo.fecha_limite, estado: acuerdo.estado, fecha_creacion: acuerdo.fecha_creacion, id_usuario: acuerdo.id_usuario
    });
  }

  enviarCorreo() {
    const cuerpo = this.tablaPendientes.nativeElement.innerHTML;
    const proyectoNombre = this.proyectoForm.value.nombre;
    const usuariosCorreo = this.usuariosProyecto.map(function (correo) {
      return correo.correo
    }).join(',');
    this.principalService.enviarCorreo(usuariosCorreo, cuerpo, proyectoNombre)
      .subscribe(resp => {
        Swal.fire(
          'Correo enviado',
          'Se envió el acta a los usuarios',
          'success'
        )
      }, (error) => {
        Swal.fire(
          'Correo enviado',
          error.error.msg,
          'error'
        )
      });
  }

}
