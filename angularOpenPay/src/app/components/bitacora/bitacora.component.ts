import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { ApiServiceEndpoint } from "../../servicios/api.serviceEndpoint";
//import { ModelLoadAverage } from 'src/app/modelos/ModelLoadAverage';
import { Chart } from "chart.js";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-bitacora",
  templateUrl: "./bitacora.component.html",
  styleUrls: ["./bitacora.component.scss"],
})
export class bitacoraComponent implements OnInit {

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
      (load) => {
        // this.load = load;
        

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

