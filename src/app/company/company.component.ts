import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router'

import languagesJson from '../../assets/languages.json';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  //User logged
  userLogged:string
  //
  //My info variables
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
  


  /////
  
  /////

  
  pJobName:string;
  pToday= new Date();
  pDescription:string;
  pDate=new Date();
  //Certifications
  certificaciones:Certificacion[]=[];
  pCertificado_Title: string;
  pCertificado_name:string;
  pCertificationFlag:boolean=false;

  pCertificado_year=new Date();
  displayedColumnsCertification = ["Title","action"];
  dataSourceCertification: MatTableDataSource<Certificacion>;

    //Columnas de Software
    displayedColumnsSoftware = ["Software", "type","action"];
    dataSourceSoftware: MatTableDataSource<Software>;
    pSoftwareType:string;
    pSoftware:string;
    pSoftwareFlag:boolean =  false;
    software: Software[]=[];
    //Languages
    languages: Language[]=[];
  pLanguage:string;
  pDomain:string;
  displayedColumnsLangue = ["language", "conversational domain","action"];
  dataSourceLanguage: MatTableDataSource<Language>;

  //
  contests: Contest[]=[];
  dataSourceContest: MatTableDataSource<Contest>;
  displayColumnsContest = ["Job", "Date1","Date2","Action","End"];



  //For views
  dataSourceLanguage1: MatTableDataSource<Language>;
  dataSourceSoftware1: MatTableDataSource<Software>;
  dataSourceCertification1: MatTableDataSource<Certificacion>;
  displayedColumnsSoftware1 = ["Software", "type"];
  displayedColumnsLanguage1 = ["language", "conversational domain"];
  displayedColumnsCertification1= ["Title"];

  //FOR COMBOBOX
  languages1$:any[];







  constructor(private route: ActivatedRoute) { 
    this.languages1$=new Array();
    languagesJson.forEach(element=>{
      this.languages1$.push({name:element.name});
    });
  }

  ngOnInit() {
    this.userLogged=this.route.snapshot.paramMap.get('id');
    this.startLoadPosts();
  }
  getDate(date:Date){
    var date1= (date.getFullYear())+"-"+(date.getMonth()+1)+"-"+(date.getDate());
    return date1;
  }
  goToMyInfo(){
    var companyDiv = (<HTMLElement>document.getElementById("container1")); 
    var personDiv = (<HTMLElement>document.getElementById("container2"));
    companyDiv.style.display="none";
    personDiv.style.display="block";
    this.getData();
  }
  goToContest(){
    var companyDiv = (<HTMLElement>document.getElementById("container2")); 
    var personDiv = (<HTMLElement>document.getElementById("container1"));
    companyDiv.style.display="none";
    personDiv.style.display="block";
  }
  closeView(){
    this.pJobName=""
    this.pToday=new Date();
    this.pDescription= ""
    this.pDate= new Date();
    var companyDiv = (<HTMLElement>document.getElementById("viewWork")); 
    var personDiv = (<HTMLElement>document.getElementById("addBody"));
    companyDiv.style.display="none";
    personDiv.style.display="block";
  }
  fixDate(date:Date){
    var dateResult= (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()));
    return dateResult
  }
  addContest(){
    /*this.results$.push({
      job:this.pJobName,date1:this.pToday.toDateString(),date2:this.pDate.toDateString(),description:this.pDescription
    ,language:this.languages,certificaction:this.certificaciones,software:this.software})
    */
   this.contests.push({
      postID:1,
      job:this.pJobName,
      date1:this.pToday.toDateString(),
      date2:this.pDate.toDateString(),
      description:this.pDescription,
      language:this.languages,
      certificaction:this.certificaciones,
      software:this.software})
    this.dataSourceContest= new MatTableDataSource(this.contests);
    this.startNewPost();

  }
  deleteContest(rowid:number){
    if (rowid > -1) {
      //console.log(this.contests[rowid].postID)
      this.finishPost(this.contests[rowid].postID);
/*
      this.contests.splice(rowid, 1);
      this.dataSourceContest = new MatTableDataSource(this.contests);*/
     }
  }
  selectContest(rowid:number){
    var companyDiv = (<HTMLElement>document.getElementById("viewWork")); 
    var personDiv = (<HTMLElement>document.getElementById("addBody"));
    companyDiv.style.display="block";
    personDiv.style.display="none";
    this.pJobName=this.contests[rowid].job;
    this.pToday=new Date(this.contests[rowid].date1.toString());
    this.pDescription= this.contests[rowid].description;
    this.pDate= new Date(this.contests[rowid].date2);
    this.dataSourceSoftware1= new MatTableDataSource(this.contests[rowid].software);
    this.dataSourceLanguage1= new MatTableDataSource(this.contests[rowid].language);
    this.dataSourceCertification1= new MatTableDataSource(this.contests[rowid].certificaction);
  }

  //Add a lan to lantable
  addLanguage(){
    
    this.languages.push({name:this.pLanguage,domain:this.pDomain});
    this.dataSourceLanguage = new MatTableDataSource(this.languages);
    
  }
  //Delete a row from lanTable
  deleteLanguage(rowid: number){
    if (rowid > -1) {
     this.languages.splice(rowid, 1);
     this.dataSourceLanguage = new MatTableDataSource(this.languages);
    }
    
  }
  //Creates Json of Software 
  createSoftware(pName:string, pType:string,pFlag:boolean){
    return{
      name:pName,
      type:pType,
      required:pFlag,
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
    
    this.software.push(this.createSoftware(this.pSoftware,this.pSoftwareType,this.pSoftwareFlag));
    this.dataSourceSoftware = new MatTableDataSource(this.software);
    
  }

  getLastPost(post){
    console.log("Entra a get last post:",this.userLogged)
    fetch("http://localhost:3000/lastPost/"+post, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            //console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
        console.log(jsonData[0].postid);
        this.makePostLanguages(2,jsonData[0].postid);
        this.makePostSoftware(2,jsonData[0].postid);
        this.makePostCertifications(2,jsonData[0].postid);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
  }

  newPostInfo(companyData){
    console.log(companyData);
    fetch("http://localhost:3000/companyPost", {
        "method": "post",
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          body: JSON.stringify(companyData)
      }).then(async (response)=> {
        console.log(response);
        if(response.status ==201){          
          alert("User updated correctly"); 
          this.getLastPost(companyData.company);
        }else{
          alert("Error adding this user data");
        }
      });   
  }

  makePostLanguages(type,userID){
    //this.getID(username,type);      
    this.languages.forEach(async function(element){
      var language={
        "post":userID,
        "language":element.name,
        "proficiency":element.domain
      }
      await fetch("http://localhost:3000/newLanguage/:"+type, {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          //console.log(response);
          if(response.status ==201){            
            console.log("Language added correctly");            
          }else{            
            alert("Error adding this user languages");
          }
        });   
    });
  }
  makePostSoftware(type,userID){
    this.software.forEach(function(element){
      var software={}    
      software ={
        "post":userID,
        "softwareType":element.type,
        "softwareName":element.name,
        "needRate":element.required    
      }
      console.log(software);
      fetch("http://localhost:3000/newSoftware/:"+type, {
          "method": "POST",
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(software)
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
  makePostCertifications(type,userID){
    console.log(this.certificaciones)
    this.certificaciones.forEach(function(element){
      var certification={}    
      certification ={
        "post":userID,
        "certificationName":element.title,
        "needRate":element.required 
      }
      fetch("http://localhost:3000/newCertification/:"+type, {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(certification)
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
  
  startLoadPosts(){
    fetch("http://localhost:3000/users/"+2+"/"+this.userLogged, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            //console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
        this.startLoadPost_aux(jsonData[0].companyid)        
      })
      .catch(err => {
        console.log(err);
      })    
  }

  getPostSoftwares(postid,counter){
    fetch("http://localhost:3000/postSoftwares/"+postid, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            //console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
         console.log(jsonData);
         jsonData.forEach(element => {
          this.contests[counter].software.push({name:element.softwarename,type:element.softwaretype,required:element.needrate})
          this.dataSourceSoftware1= new MatTableDataSource(this.contests[counter].software);
          });
      })
      .catch(err => {
        console.log(err);
      })
  }
  getPostCertifications(postid,count){
    fetch("http://localhost:3000/postCertifications/"+postid, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            //console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
        jsonData.forEach(element => {
          this.contests[count].certificaction.push(
            {
              title:element.certificationname,
              required:element.needrate
            }
          );
          this.dataSourceCertification1= new MatTableDataSource(this.contests[count].certificaction);
        });        
      })
      .catch(err => {
        console.log(err);
      })
  }
  getPostLanguages(postid,count){
    fetch("http://localhost:3000/postLanguages/"+postid, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            //console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
        //Here goes the code     
        jsonData.forEach(element => {
          this.contests[count].language.push(
            {
              name: element.languagename,
              domain: element.proficiency
            }
          );
          this.dataSourceLanguage1= new MatTableDataSource(this.contests[count].language);
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  startLoadPost_aux(company){
    fetch("http://localhost:3000/companyPost/"+company, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            //console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
        console.log(jsonData); 
        var count=0;
        jsonData.forEach(element=>{
          this.contests.push({
            postID:element.postid,
            job:element.jobname,
            date1:element.postdate,
            date2:element.expirationdate,
            description:element.description,
            language:[],
            certificaction:[],
            software:[]
            })
          this.getPostSoftwares(element.postid,count);
          this.getPostLanguages(element.postid,count);
          this.getPostCertifications(element.postid,count);
          count++;
        }       
        );
        jsonData.forEach(element => {          
          
          //this.getPostCertifications(element.postid);
          //this.getPostLanguages(element.postid);
          //this.dat
        });
        
        this.dataSourceContest=new MatTableDataSource(this.contests);  
      })
      .catch(err => {
        console.log(err);
      })
  }

  startNewPost(){
    console.log("Usuario:",this.userLogged)
    fetch("http://localhost:3000/users/"+2+"/"+this.userLogged, {
        "method": "GET"        
      })
      .then(response => {
        if(response.ok){
            //console.log(response);
            return response.json();
        }else{
            throw new Error('BAD HTTP stuff');
        }
      })
      .then( (jsonData) =>{
        console.log(jsonData);
        var post={
          "company":jsonData[0].companyid,
          "jobName":this.pJobName,
          "postDate":this.pToday,
          "expirationDate":this.pDate,
          "description":this.pDescription,
          "isActive":0
        }
        this.newPostInfo(post)
        /*this.getWorks(jsonData[0].userid);
        this.getLanguages(jsonData[0].userid);
        this.getSoftware(jsonData[0].userid);
        this.getCertifications(jsonData[0].userid);
        this.getStudies(jsonData[0].userid);*/
      })
      .catch(err => {
        console.log(err);
      })
  }

  finishPost(post){
    //console.log(userData);
    console.log(post)
    fetch("http://localhost:3000/companyPost/"+post, {
        "method": "PUT",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }).then((response)=> {
        console.log(response);
        if(response.status ==201){
          
          alert("Company added correctly");
          
        }else{
          alert("Error adding this user data");
        }
      });     
  }

  makePost(type,userData,username){
    console.log(userData);
    fetch("http://localhost:3000/newUserData/:"+type, {
        "method": "PUT",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          body: JSON.stringify(userData)
      }).then((response)=> {
        console.log(response);
        if(response.status ==201){
          
          alert("Company added correctly");
          
        }else{
          alert("Error adding this user data");
        }
      });     
  }
  addUserInfo(type,username){
    var userData;
    username="C2";
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
        console.log(userData);
        this.makePost(2,userData,username);
      }else{
        alert("Please fill the all the general company information")
      }  
    
  }

  //addCertification
  getData(){
    fetch("http://localhost:3000/newUserData/2/"+this.userLogged,{
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
        
        var company = jsonData[0]
        console.log(company);                
        this.companyName = company.companyname;
        this.companyProvince = company.province;
        this.companyCanton = company.canton;
        this.companyDistrict = company.district;
        this.companyPhone = company.phone;
        this.companyWebsite = company.website;
        this.companyContactName = company.contactname;
        this.companyUrl = company.logo;
        this.companyEmail = company.mail;
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }

  addCertification(){
    
    this.certificaciones.push({title:this.pCertificado_Title,required:this.pCertificationFlag});
    this.dataSourceCertification = new MatTableDataSource(this.certificaciones);
    
    }
    //Deletes a row from certification
    deleteCertification(rowid: number){
      if (rowid > -1) {
       this.certificaciones.splice(rowid, 1);
       this.dataSourceCertification = new MatTableDataSource(this.certificaciones);
      }
      
    }
}
export interface Software{
  name: string;
  type: string;
  required:boolean;
}
export interface Language{
  name: string;
  domain: string;
}
export interface Certificacion{
  title: string;
  required:boolean;
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
export interface Contest{
  job:string;
  date1:string;
  date2:string;
  description:string;
  postID:Number;
  language:Language[];
  certificaction:Certificacion[];
  software:Software[];
}