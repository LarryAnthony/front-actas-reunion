import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  public mensaje: string;
  public visible: string = 'd-none';
  constructor(private fb: FormBuilder, public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        this.mensaje = err.error.msg;
        this.visible = '';
      });
  }

}
