import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getUser(){    
    console.log("Entro");
    fetch("http://localhost:3000/users/amairena", {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
        console.log(response);
      })
      .then( (jsonData) =>{
        console.log(jsonData);
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
