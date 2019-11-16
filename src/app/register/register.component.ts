import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  //Funcionalidad del botón de Compañía
  goToCompany(){
    var companyDiv = (<HTMLElement>document.getElementById("companyForm")); 
    var personDiv = (<HTMLElement>document.getElementById("userForm"));
    
    personDiv.style.display="none";
    companyDiv.style.display="block";
    
  }
  //Funcionalidad del botón de persona
  goToPerson(){
    var companyDiv = (<HTMLElement>document.getElementById("companyForm")); 
    var personDiv = (<HTMLElement>document.getElementById("userForm"));
    companyDiv.style.display="none";
    personDiv.style.display="block";
  }
}
