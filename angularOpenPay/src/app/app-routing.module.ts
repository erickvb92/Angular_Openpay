
import { LoginComponent } from "./components/login/login.component";
import { BienvenidoComponent } from "./components/bienvenido/bienvenido.component";
import { bitacoraComponent } from "./components/bitacora/bitacora.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "login", component: LoginComponent, data: { title: "login" } },
  { path: "bienvenido", component: BienvenidoComponent, data: { title: "bienvenido" } },
  { path: "bitacora", component: bitacoraComponent, data: { title: "bitacora" } },

  // otherwise redirect to home
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
