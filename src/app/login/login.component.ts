import { Component, OnInit } from '@angular/core';
import countriesJson from '../../assets/countries.json';
import languagesJson from '../../assets/languages.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

 
export class LoginComponent implements OnInit {
  user:string;
  password:string;
  countries=[];
  
  constructor() { }

  ngOnInit() {
  }
  getUser(){    
    if(this.user && this.password){
      
      
      console.log(countriesJson);
      fetch("http://localhost:3000/users/"+this.user, {
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
          console.log(JSON.stringify(jsonData).length);
          
          if(JSON.stringify(jsonData).length !=2){
            if(this.password.endsWith(jsonData[0].pass) ){
              alert("Cambio de ventana")
            }else{
              alert("Invalid password");
            }
          }else{
            alert("Invalid Username");
          }
          //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
          //FiltroCiudad(jsonData);
        })
        .catch(err => {
          console.log(err);
        })
    }else{
      alert("Please insert valid user and passwords")
    }
  }
}
