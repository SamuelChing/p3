import { Component, OnInit, ɵConsole } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import countriesJson from '../../assets/countries.json';
import languagesJson from '../../assets/languages.json';
import { element } from 'protractor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //---Json
  languages1$:any[];
  countries$:any[];
  userPK:Number;
  //--------------------------------Company*----------------------------------//
  companyUser:string;
  companyPassword:string;
  companyName:string;
  companyProvince:string;
  companyCanton:string;
  companyDistrict:string;
  companyPhone:string;
  companyWebsite:string;
  companyContactName:string;
  companyUrl:string;
  companyEmail:string;
  //*-------------------------------Usuario-----------------------------------//
  //Useful info
  user:string;
  password:string;
  firstName:string;
  lastName:string;
  //Info
  birthday=new Date();
  country:string;
  province:string;
  canton:string;
  district:string
  //Media
  url:string;
  email:string  
  phone:string;
  webSite:string;
  //Columnas de Software
  displayedColumnsSoftware = ["Software", "type","action"];
  dataSourceSoftware: MatTableDataSource<Software>;
  pSoftwareType:string;
  pSoftware:string;
  software: Software[]=[];
  //Idiomas
  languages: Language[]=[];
  pLanguage:string;
  pDomain:string;
  displayedColumnsLangue = ["language", "conversational domain","action"];
  dataSourceLanguage: MatTableDataSource<Language>;
  //Certificaciones
  certificaciones:Certificacion[]=[];
  pCertificado_Title: string;
  pCertificado_name:string;
  pCertificado_year=new Date();
  displayedColumnsCertification = ["Title", "Name of place","Date of graduation","action"];
  dataSourceCertification: MatTableDataSource<Certificacion>;
  //Studies
  studies: Study[]=[];
  pStudy_grade:string;
  pStudy_name:string;
  pStudy_year=new Date();
  displayedColumnsStudies = ["Grade", "Name of place","Date of graduation","action"];
  dataSourceStudies: MatTableDataSource<Study>;

  //Work exp
  work: Work[]=[];
  pWork_Company:string;
  pWork_job:string;
  pWork_date1= new Date();
  pWork_date2=new Date();
  pWork_des:string;
  pWorkisChecked:boolean=false;
  displayedColumnsWork = ["Company", "Job","date of admission","departure date","Active","action"];
  dataSourceWork: MatTableDataSource<Work>;
  constructor( private router: Router) {
    this.dataSourceCertification= new MatTableDataSource(this.certificaciones);
    this.dataSourceLanguage= new MatTableDataSource(this.languages);
    this.dataSourceSoftware = new MatTableDataSource(this.software);
    this.dataSourceWork = new MatTableDataSource(this.work);
    this.dataSourceStudies= new MatTableDataSource(this.studies);
    this.languages1$=new Array();
    this.countries$=new Array();
    countriesJson.forEach(element=>{
      this.countries$.push({name:element.name});
    });
    languagesJson.forEach(element=>{
      this.languages1$.push({name:element.name});
    });
    //posts de companies
    
   }
   private userInfoSetter;
  ngOnInit() {
  }

  fixDate(date:Date){
    var dateResult= (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()));
    return dateResult
  }
  goBack(){
    this.router.navigate(["/login"]);
  }
  //add a work in table
  addWork(){

    var activeFlag;
    if(this.pWorkisChecked){
      activeFlag="yes"
    }
    else{
      activeFlag="no"
    }
    if(this.pWork_Company && this.pWork_job && this.pWork_date2 && this.pWork_date1 && this.pWork_des){
      this.work.push({company:this.pWork_Company,job:this.pWork_job,
      date1:this.fixDate(this.pWork_date1),date2:this.fixDate(this.pWork_date2),
      description:this.pWork_des,active:this.pWorkisChecked});
      this.dataSourceWork = new MatTableDataSource(this.work);
    }
    else{
      alert("Please fill all the inputs of your work experience")
    }
  }
  //Deletes work from work table
  deleteWork(rowid:number){
    if (rowid > -1) {
      this.work.splice(rowid, 1);
      this.dataSourceWork = new MatTableDataSource(this.work);
     }
  }
  //AddStudies
  addStudy(){
    if(this.pStudy_grade && this.pStudy_name && this.pStudy_year){
      this.studies.push({grade:this.pStudy_grade,name:this.pStudy_name,year:this.fixDate(this.pStudy_year)});
      this.dataSourceStudies = new MatTableDataSource(this.studies);
    }
    else{
      alert("Please fill all the inputs");
    }
  }
  //delete row from Studies
  deleteStudy(rowid: number){
    if (rowid > -1) {
     this.studies.splice(rowid, 1);
     this.dataSourceStudies = new MatTableDataSource(this.studies);
    }
    
  }

//addCertification

  addCertification(){
    
    if(this.pCertificado_Title && this.pCertificado_name && this.pCertificado_year){
      this.certificaciones.push({title:this.pCertificado_Title,name:this.pCertificado_name,year:this.fixDate(this.pCertificado_year)});
      this.dataSourceCertification = new MatTableDataSource(this.certificaciones);
      }
      else{
        alert("Please fill all the inputs in the certification section")
      }
  
  }
  //Deletes a row from certification
  deleteCertification(rowid: number){
    if (rowid > -1) {
     this.certificaciones.splice(rowid, 1);
     this.dataSourceCertification = new MatTableDataSource(this.certificaciones);
    }
    
  }


  //Add a lan to lantable
  addLanguage(){
    
    if(this.pDomain && this.pLanguage){
      this.languages.push({name:this.pLanguage,domain:this.pDomain});
      this.dataSourceLanguage = new MatTableDataSource(this.languages);
    }
    else{
      alert("Please fill all the inputs to add a language")
    }
    
  }
  //Delete a row from lanTable
  deleteLanguage(rowid: number){
    if (rowid > -1) {
     this.languages.splice(rowid, 1);
     this.dataSourceLanguage = new MatTableDataSource(this.languages);
    }
    
  }

  //Creates Json of Software 
  createSoftware(pName:string, pType:string){
    return{
      name:pName,
      type:pType
    }
  }
  //Deletes a Software from table
  deleteSoftware(rowid: number){
    if (rowid > -1) {
     this.software.splice(rowid, 1);
     this.dataSourceSoftware = new MatTableDataSource(this.software);
    }
    
  }
  //Adds a software to software table
  addSoftware(){
    
    if(this.pSoftware && this.pSoftwareType){
      this.software.push(this.createSoftware(this.pSoftware,this.pSoftwareType));
      this.dataSourceSoftware = new MatTableDataSource(this.software);
    }
    else{
      alert("Please fill al the inputs in order to add a Software");
    }
    
  }

  //Funcionalidad del botón de Compañía
  goToCompany(){
    var companyDiv = (<HTMLElement>document.getElementById("companyForm")); 
    var personDiv = (<HTMLElement>document.getElementById("userForm"));
    
    personDiv.style.display="none";
    companyDiv.style.display="block";
    
  }
  //Funcionalidad del botón de persona
  makePostLanguages(type,username,userID){
    //this.getID(username,type);      
    this.languages.forEach(function(element){
      var language={
        "person":userID,
        "language":element.name,
        "proficiency":element.domain
      }
      fetch("http://localhost:3000/newLanguage/:"+type, {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          console.log(response);
          if(response.status ==201){            
            console.log("Language added correctly");            
          }else{            
            alert("Error adding this user languages");
          }
        });   
    });
  }
  makePostSoftware(type,username,userID){
    this.software.forEach(function(element){
      var language={}    
      language ={
        "person":userID,
        "softwareType":element.type,
        "softwareName":element.name     
      }
      fetch("http://localhost:3000/newSoftware/:"+type, {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          console.log(response);
          if(response.status ==201){            
            console.log("Software added correctly");            
          }else{            
            alert("Error adding this user softwares");
          }
        });   
    });
  }
  makePostExperience(type,username,userID){
    this.work.forEach(function(element){
      var language={}    
      language ={
        "person":userID,
        "company":element.company,
        "role":element.job,
        "admissionDate":element.date1,
         "departureDate":element.date2,
         "activeJob":element.active,
         "description":element.description
      }
      fetch("http://localhost:3000/userExperience", {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          console.log(response);
          if(response.status ==201){            
            console.log("Experience added correctly");            
          }else{            
            alert("Error adding this user Experience");
          }
        });   
    });
  }
  makePostStudies(type,username,userID){
    this.studies.forEach(function(element){
      var studies={}    
      studies ={
        "person":userID,
        "grade":element.grade,
        "titleGiver":element.name,
        "graduated":element.year     
      }
      fetch("http://localhost:3000/userStudies", {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(studies)
        }).then(function(response) {
          console.log(response);
          if(response.status ==200){            
            console.log("Studies added correctly");            
          }else{            
            alert("Error adding this user Studies");
          }
        });   
    });
  }
  makePostCertifications(type,username,userID){
    this.certificaciones.forEach(function(element){
      var language={}    
      language ={
        "person":userID,
        "title":element.title,
        "certificationGiver":element.title,
        "certificationYear":element.year     
      }
      fetch("http://localhost:3000/newCertification/:"+type, {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          console.log(response);
          if(response.status ==201){            
            console.log("Certification added correctly");            
          }else{            
            alert("Error adding this user certifications");
          }
        });   
    });
  }

  getID(username,type){
    fetch("http://localhost:3000/users/"+type+"/"+username, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
        console.log(jsonData[0].userid);
        if(type==1){
          this.makePostLanguages(type,username,jsonData[0].userid);
          this.makePostSoftware(type,username,jsonData[0].userid);
          this.makePostCertifications(type,username,jsonData[0].userid);
          this.makePostExperience(type,username,jsonData[0].userid);
          this.makePostStudies(type,username,jsonData[0].userid);
          alert("User information added correctly");
          window.location.reload();
        }
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }

  makePost(type,userData,username){

    fetch("http://localhost:3000/newUserData/:"+type, {
        "method": "POST",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          body: JSON.stringify(userData)
      }).then((response)=> {
        console.log(response);
        if(response.status ==201){
          if(type==1){
            this.getID(username,type)
            
          }
          else{
            alert("Company added correctly");
            window.location.reload();
          }
        }else{
          alert("Error adding this user data");
        }
      });     
  }
  addNewUser(type){
    console.log("in ",type)
    var user={}
    if(type==2){
    user = {
      "username":this.companyUser,
      "pass":this.companyPassword,
      "userType":type
    }
    }else{
      user = {
        "username":this.user,
        "pass":this.password,
        "userType":type
      }
    }
    if((type == 2 && this.companyUser && this.companyPassword && this.companyName && this.companyProvince && this.companyCanton && this.companyDistrict&& this.companyPhone && this.companyWebsite
      && this.companyContactName && this.companyUrl && this.companyEmail)
    ||(type == 1 && this.user && this.password && this.user && this.firstName && this.lastName && this.country && this.province && this.canton && this.district 
      && this.email && this.phone && this.webSite && this.url && (this.languages) || this.languages.length)
      && (this.software || this.software.length) && (this.certificaciones || this.certificaciones.length)
      && (this.work || this.work.length)){
       
    fetch("http://localhost:3000/newSystemUser", {
        "method": "POST",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
         body: JSON.stringify(user)
      }).then((response)=>{
        console.log(response);
        if(response.status ==201){
          //alert("User added correctly");
          if(type==2){
          this.addUserInfo(2,this.companyUser);
          }
          else{
            this.addUserInfo(1,this.user);
          }
          
        }else{
          alert("This username already exists");
        }
      });
    }else{
      alert("Check your and fill all the information");
    }
  }
  addUserInfo(type,username){
    var userData;
    if(type==2){
      if(this.companyName && this.companyProvince && this.companyCanton && this.companyDistrict&& this.companyPhone && this.companyWebsite
        && this.companyContactName && this.companyUrl && this.companyEmail){
          userData = {        
            "companyName":this.companyName,
            "province":this.companyProvince,
            "canton":this.companyCanton,
            "district":this.companyDistrict,
            "mail":this.companyEmail,
            "phone":this.companyPhone,
            "website":this.companyWebsite,
            "logo":this.companyUrl,
            "contactName":this.companyContactName,
            "username":username
          }
          this.makePost(2,userData,username);
        }else{
          alert("Please fill the all the company information")
        }
      
      
    }else{
      if(this.user && this.firstName && this.lastName && this.country && this.province && this.canton && this.district 
        && this.email && this.phone && this.webSite && this.url){
          
        userData={
          "userID":this.user,
          "firstName":this.firstName,
          "LastName":this.lastName,
          "nationality":this.country,
          "birthday":this.birthday,
          "province":this.province,
          "canton":this.canton,
          "district":this.district,
          "mail":this.email,
          "phone":this.phone,
          "website":this.webSite,
          "picture":this.url,                
          "username":username
        }
        
        this.makePost(1,userData,username);
      }else{
        alert("Please fill the all the user information")
      }
    }    
  }
  
  goToPerson(){
    var companyDiv = (<HTMLElement>document.getElementById("companyForm")); 
    var personDiv = (<HTMLElement>document.getElementById("userForm"));
    companyDiv.style.display="none";
    personDiv.style.display="block";
  }
}
export interface Software{
  name: string;
  type: string;
}
export interface Language{
  name: string;
  domain: string;
}
export interface Certificacion{
  title: string;
  name: string;
  year: string;
}
export interface Study{
  grade: string;
  name: string;
  year: string;
}
export interface Work{
  company:string;
  job:string;
  date1:string;
  date2:string;
  active:boolean;
  description:string;
}
 