import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {CompanyComponent} from "./company/company.component";
import {LoginComponent} from "./login/login.component"
import {RegisterComponent} from "./register/register.component"
const routes: Routes = [
{path: '',  redirectTo: 'login',  pathMatch: 'full'},
{path: "login", component:LoginComponent },
{path: "company/:id", component:CompanyComponent },
{path: "user/:id", component:UserComponent },
{path: "register", component:RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
