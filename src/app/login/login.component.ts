import { Component, OnInit } from '@angular/core';
import countriesJson from '../../assets/countries.json';
import languagesJson from '../../assets/languages.json';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

 
export class LoginComponent implements OnInit {
  user:string;
  password:string;
  countries=[];
  
  constructor(private router: Router) { }
  
  ngOnInit() {
  }
  getUser(){ 
    //Si no son vacíos   
    if(this.user && this.password){
      
      
      //console.log(countriesJson);
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
          //Diferente a vacío
          if(JSON.stringify(jsonData).length !=2){
            
            if(this.password.localeCompare(jsonData[0].pass)==0 ){
              if(jsonData[0].usertype==1){
                this.router.navigate(["/user",this.user]);
              }
              else{this.router.navigate(["/company",this.user]);
              }
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
