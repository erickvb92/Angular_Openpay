import { Component, ViewChild, OnInit } from "@angular/core";
import { ApiServiceEndpoint } from "../../servicios/api.serviceEndpoint";
import Swal from "sweetalert2";
import { Router} from '@angular/router';
import { DatePipe } from '@angular/common'
import {HttpClient} from '@angular/common/http';
import { Result } from "src/app/modelos/marvel/response/responseMarvel";
import { DialogoConfirmacionComponent } from "../dialogo/dialogo-confirmacion.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-bienvenido",
  templateUrl: "./bienvenido.component.html",
  styleUrls: ["./bienvenido.component.scss"],
})
export class BienvenidoComponent implements OnInit {
  
  showMyContainer: boolean = false;
  
  Card: Result[] = [];
  dataCard: any;

  constructor(private apiservice: ApiServiceEndpoint, private router: Router, public datepipe: DatePipe, private http : HttpClient, public dialogo: MatDialog) {
    //constructor
  }

  ngOnInit() {
    this.getDataMarvel();
  }

  getDataMarvel(){
    this.show();
    this.apiservice.getDataMarvel().subscribe(
      (res) => {
        // this.load = load;
        console.log(res);
        res.data.results.forEach((item) => {

          this.dataCard = {
            id: item.id,
            name: item.name,
            description: item.description,
            modified: item.modified,
            thumbnail: item.thumbnail.path+"."+item.thumbnail.extension,
          };
          console.log(this.dataCard.thumbnail);
          this.Card.push(this.dataCard);
        });
        this.hide();
      },
      (error) => {
        console.log(error);
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

  openDialog(id: string) {
    this.dialogo
    .open(DialogoConfirmacionComponent, {
      width: '70%',
      data: id
    });

  }
}