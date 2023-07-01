import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isLogin = false;
  user: any ;
  constructor(
    private router: Router 
  ) {
  }
  ngOnInit() {
    if (localStorage.getItem('Usuario')) {
      let username = localStorage.getItem('Usuario').replace("_", " ");
      this.user = username;
    }
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  isExpanded2 = false;
  showSubmenu2: boolean = false;
  isShowing2 = false;
  showSubSubMenu2: boolean = false;

  isExpanded3 = false;
  showSubmenu3: boolean = false;
  isShowing3 = false;
  showSubSubMenu3: boolean = false;

  seleccion: any ;
  ocultar1: any;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
    if (!this.isExpanded2) {
      this.isShowing2 = true;
    }
    if (!this.isExpanded3) {
      this.isShowing3 = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
    if (!this.isExpanded2) {
      this.isShowing2 = false;
    }
    if (!this.isExpanded3) {
      this.isShowing3 = false;
    }
  }

  ocultarMenu1(){
    if (this.isExpanded) {
      this.ocultar1 = false;
    }else{
      this.ocultar1 = true;
    }
    return this.ocultar1;
  }

  colapse(){
    if (this.isExpanded) {
      this.isExpanded = false;
    }else{
      this.isExpanded = true;
    }
    if (this.isExpanded2) {
      this.isExpanded2 = false;
    }else{
      this.isExpanded2 = true;
    }

    if (this.isExpanded3) {
      this.isExpanded3 = false;
    }else{
      this.isExpanded3 = true;
    }
  }

  links = [
    {
      name: "Bitacora",
      url: "bitacora",
      icon: "book"
    },
    {
      name: "Inicio",
      url: "bienvenido",
      icon: "important_devices"
    }
  ]

 
  getValue(event, name: any){
    this.seleccion = event.target.parentNode.innerText;
    console.log(event.target.parentNode.innerText);
  }

  
  IsLogin(){
    //console.log(this.router.url);
     if(this.router.url != '/login'){
      this.isLogin = true;
     }else{
      this.isLogin = false;
     }
    return this.isLogin;
  }
  
  logout(){
    console.log("logout");
    if (localStorage.getItem('Usuario')) {
      localStorage.removeItem('Usuario');
      this.router.navigate(['/login']).then();
    }
  }

  title = 'angularOpenPay';

}
