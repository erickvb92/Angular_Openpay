import { Component, ViewChild, OnInit } from "@angular/core";
import { ApiServiceEndpoint } from "../../servicios/api.serviceEndpoint";
import * as CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { requestLogin } from "../../modelos/login/request/requestLogin";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router} from '@angular/router';
import { DatePipe } from '@angular/common'

import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showMyContainer: boolean = false;
  error: any;
  req = new requestLogin();
  myLogin: FormGroup;
  ocultar: boolean = true;

  //for captcha vars.
  web_key_for_captcha_google_api_v2="6LfOXP0lAAAAAFQ9eQUmzRUYN2kUzy5GTzf1eijU";
  captchaResolved : boolean = false;
  mostrar_captcha : boolean = false;

  constructor(private apiservice: ApiServiceEndpoint, private fb: FormBuilder, private router: Router, public datepipe: DatePipe, private http : HttpClient, private cookieService: CookieService) {
    //constructor
  }

  ngOnInit() {
    this.myLogin = this.fb.group({
      user: this.cookieService.get("username"),
      pass: this.cookieService.get("password"),
    });
  }

  revisaLogin(){
    if (!localStorage.getItem('Usuario')) {
      this.router.navigate(['/login']).then()
    }else{
      this.router.navigate(['/bienvenido']).then()
    }
  }

  subir(form: FormGroup)
  {
    console.log("entra aqui");
    if(!this.captchaResolved && this.mostrar_captcha)
    {
      console.log("entra aqui, pero tiene error de captcha ");
      Swal.fire({
        title: "Error!",
        text: "Favor de completar el captcha para acceder",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }else
    {

      const usuario = form.value.user;
      const contraseña = form.value.pass;

      this.req.username = usuario;
      this.req.password = contraseña;

      console.log(this.req);
      this.login(this.req);
      this.cookieService.set('username', form.value.user);
      this.cookieService.set('password', form.value.pass);
    }


  }

  login(request: requestLogin) {
    this.show();
    
    this.apiservice.getLogin(request, ).subscribe(
      (load) => {
        console.log(load);
        if (load.mensaje == "ok Exito: Acceso correcto") {
          this.mostrar_captcha = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Acceso correcto " + load.detalles,
            showConfirmButton: false,
            timer: 2000,
          });
          localStorage.setItem('Usuario', load.detalles);
          localStorage.setItem('token', load.token);
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/bienvenido']).then()
          //const clicks = localStorage.getItem('Usuario');
        } else {

          this.resetCaptcha();
          this.captchaResolved = false;
          this.mostrar_captcha = true;
          Swal.fire({
            title: "Error!",
            text: load.mensaje,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
        this.hide();
      },
      (error) => {
        //este no es un error del usuario, sino de conexion o de back, pero que igual muestre el captcha
        this.resetCaptcha();
        this.captchaResolved = false;
        this.mostrar_captcha = true;
        this.error = error;
        console.log(error);
        this.hide();
        Swal.fire({
          title: "Error!",
          text: this.error,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    );
  }

  show() {
    this.showMyContainer = true;
    //document.getElementById('loading').style.display = 'block';
    console.log("loading visible");
  }

  hide() {
    this.showMyContainer = false;
    //document.getElementById('loading').style.display = 'none';
    console.log("loading Invisible");
  }

  //methods for captcha
  checkCaptcha(captchaResponse : string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
}

// metodo para reiniciar el captcha si existe en el DOM, si este metodo no esta, aunque falle, el captcha expira en los tiempos de google
resetCaptcha()
{
  if(this.mostrar_captcha)
  {
    grecaptcha.reset();
  }

}
}
