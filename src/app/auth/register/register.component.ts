import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public usuarioForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    fecha_nacimiento: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public mensaje: string;
  public visible: string = 'd-none';

  constructor(public fb: FormBuilder, public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit(): void {
  }
  registrar() {
    this.usuarioService.registrar(this.usuarioForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/login')
      }, (error) => {
        this.mensaje = error.error.msg;
        this.visible = '';
      })
  }

}
