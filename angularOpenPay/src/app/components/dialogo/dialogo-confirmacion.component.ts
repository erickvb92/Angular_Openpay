import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiServiceEndpoint } from "../../servicios/api.serviceEndpoint";
import { Result } from "src/app/modelos/marvel/response/responseMarvel";

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent implements OnInit {
  Card: Result[] = [];
  dataCard: any;
  comics: any[] = [];
  series: any[] = [];
  stories: any[] = [];
constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>, private apiservice: ApiServiceEndpoint,
    @Inject(MAT_DIALOG_DATA) public id: string) { }

  ngOnInit() {
    this.getDataMarvelId();
  }

  getDataMarvelId(){
    this.apiservice.getDataMarvelId(this.id).subscribe(
      (res) => {
        // this.load = load;
        console.log("getDataMarvelId "+res);
        
        res.data.results.forEach((item) => {
     
          this.dataCard = {
            id: item.id,
            name: item.name,
            description: item.description,
            modified: item.modified,
            thumbnail: item.thumbnail.path+"."+item.thumbnail.extension
          };

          item.comics.items.forEach((c) => {
            this.comics.push(c.name);
          });

          item.series.items.forEach((s) => {
            this.series.push(s.name);
          });

          item.stories.items.forEach((s) => {
            this.stories.push(s.name);
          });
         
          this.Card.push(this.dataCard);

        });

        
      },
      (error) => {
        console.log(error);
      }
    );
  }

}