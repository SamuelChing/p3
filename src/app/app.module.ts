import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import {MatNativeDateModule,MatDatepickerModule,MatTableModule,MatInputModule,MatToolbarModule,MatSlideToggleModule,MatIconModule,MatExpansionModule,MatSelectModule,MatCardModule,MatButtonModule,MatDividerModule} from '@angular/material';
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
  imports: [FormsModule,MatNativeDateModule,MatDatepickerModule,MatTableModule,
    BrowserModule,MatToolbarModule,MatExpansionModule,MatIconModule,MatSlideToggleModule,
    AppRoutingModule,MatDividerModule,MatSelectModule,
    BrowserAnimationsModule,MatInputModule,MatCardModule,MatButtonModule
 
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
