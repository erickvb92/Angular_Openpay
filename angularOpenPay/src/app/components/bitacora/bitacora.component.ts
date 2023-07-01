import { Component, ViewChild, OnInit } from "@angular/core";

import { ApiServiceEndpoint } from "../../servicios/api.serviceEndpoint";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Bitacora } from "src/app/modelos/bitacora/responseBitacora";

@Component({
  selector: "app-bitacora",
  templateUrl: "./bitacora.component.html",
  styleUrls: ["./bitacora.component.scss"],
})
export class bitacoraComponent implements OnInit {
  Bitacora: Bitacora[] = [];
  bit: any;
  panelOpenState = false;
  showMyContainer: boolean = false;
  error: String = "";

  constructor(private apiservice: ApiServiceEndpoint, private router: Router) {}
  redireccionamiento() {
    if (localStorage.getItem("Usuario")) {
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/login"]).then();
    }
  }

  ngOnInit() {
    this.redireccionamiento();

    this.show();
    this.apiservice.getDataBitacora().subscribe(
      (res) => {
        // this.load = load;

        console.log(res);
        res.forEach((item) => {
     
          this.bit = {
            id: item.id,
            fecha_registro: item.fecha_registro,
            usuario: item.usuario,
            evento: item.evento,
          };
          this.Bitacora.push(this.bit);
        });

         

        this.hide();
      },
      (error) => {
        this.error = error;
        if(error.message.includes("401")){
          Swal.fire({
            position: "center",
            icon: "error",
            title: "El token expiro, inicie sesion nuevamente",
            showConfirmButton: false,
            timer: 2000,
          });
          localStorage.removeItem('Usuario');
          localStorage.removeItem('token');
          this.router.navigate(["/login"]).then();
        }
        this.hide();
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

}

