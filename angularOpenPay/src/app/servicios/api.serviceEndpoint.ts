import { Injectable } from "@angular/core";
import { modelServices } from "../modelos/modelServices";
import { requestLogin } from "../modelos/login/request/requestLogin";
import { responseLogin } from "../modelos/login/response/responseLogin";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import * as CryptoJS from "crypto-js";
import { Root } from "../modelos/marvel/response/responseMarvel";
@Injectable({
  providedIn: 'root'
})
export class ApiServiceEndpoint {

  public services: modelServices = { timestamp: "", mensaje: "", detalles: null, httpCodeMessage: "" };

  //local
  private baseURL = "http://localhost:8080";

  private getDataLogin = this.baseURL + "/authenticate"; // URL to web api

  private getMarvel = this.baseURL + "/api/openpay/jar/character"; // URL to web api
  private getMarvelId = this.baseURL + "/api/openpay/jar/characterId"; // URL to web api


  headers = new HttpHeaders()
    .set('content-type', 'application/json; charset=utf-8')
    .set('Access-Control-Allow-Origin', 'http://localhost:4200')
    .set("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE")
    .set("Access-Control-Allow-Headers", "Content-Type, x-requested-with");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    })
  };

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  //----------------------------------------------------------------

  public getLogin(req: requestLogin): Observable<responseLogin> {
    const body = JSON.stringify(req);
    console.log(body)
    return this.http.post<responseLogin>(this.getDataLogin, body,  this.httpOptions );
  }

  public getDataMarvel(): Observable<Root> {
    var t = localStorage.getItem('token');
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + t);
    console.log("token:", + t);
    return this.http.get<Root>(this.getMarvel, this.httpOptions);
  }

  public getDataMarvelId(id: string): Observable<Root> {
    var t = localStorage.getItem('token');
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + t);
    console.log("token:", + t);
    return this.http.get<Root>(this.getMarvelId+"?id="+id, this.httpOptions);
  }

  public getDataBitacora(): Observable<Root> {
    var t = localStorage.getItem('token');
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + t);
    console.log("token:", + t);
    return this.http.get<Root>(this.getDataMarvel + "&token=" + t, this.httpOptions);
  }

}
