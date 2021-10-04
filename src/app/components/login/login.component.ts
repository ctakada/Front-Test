import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snack: NotifierService,
    private router: Router
  ) {
    this.form = fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('currentUser');
  }
  async entrar() {
    try {
      const { usuario, password } = this.form.value;
      const data = { usuario, password };
      this.loginService.loginUser(data).subscribe(
        (data) => {
          if (data.ok == true) {
            //guarda datos de usuario
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ token: data.token, name: data.nombre_usuario })
            );

            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log(currentUser.token);
            this.router.navigate(['dashboard']);
          }
        },
        (error) => {
          this.showError(error);
        }
      );
    } catch (error) {
      this.showError(error);
    }

    console.log(this.form);
  }

  showError(error): void {
    console.log(error);
    this.snack.showNotificarion('Usuario o contraseña incorrectos');
    this.form.reset();
  }
}
