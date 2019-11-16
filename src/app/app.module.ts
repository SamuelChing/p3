import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import {MatInputModule,MatIconModule,MatExpansionModule,MatSelectModule,MatCardModule,MatButtonModule,MatDividerModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,MatExpansionModule,MatIconModule,
    AppRoutingModule,MatDividerModule,MatSelectModule,
    BrowserAnimationsModule,MatInputModule,MatCardModule,MatButtonModule
 
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
