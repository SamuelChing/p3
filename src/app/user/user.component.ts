import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router'
import countriesJson from '../../assets/countries.json';
import languagesJson from '../../assets/languages.json';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  languages1$:any[];
  countries$:any[];
  //USER IN -----------*Important
  userLogged:string;
  //
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
  dataSourceStudies: MatTableDataSource<Study>;
  displayedColumnsStudies = ["Grade", "Name of place","Date of graduation","action"];
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
  //Companies contests
  contests: Contest[]=[];
  dataSourceContest: MatTableDataSource<Contest>;
  displayColumnsContest = ["Job", "Date1","Date2","Action"];
  //TABLAS POR CONTEST
  dataSourceLanguage1: MatTableDataSource<Language>;
  dataSourceSoftware1: MatTableDataSource<Software>;
  dataSourceCertification1: MatTableDataSource<cCertificacion>;
  displayedColumnsSoftware1 = ["Software", "type"];
  displayedColumnsLanguage1 = ["language", "conversational domain"];
  displayedColumnsCertification1= ["Title"];
  pJobName:string;
  pToday= new Date();
  pDescription:string;
  pDate=new Date();
  //
  pActualPost:Number;
  constructor(private route: ActivatedRoute) {
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
   }

  ngOnInit() {
     this.userLogged=this.route.snapshot.paramMap.get('id');
     this.getData();
     this.startLoadPosts();
  }
  applyToJob(rowid:number){
    //console.log("You touched this button!")
    this.startGetUserAplications(this.pActualPost);
  }
  closeView(){
    this.pJobName=""
    this.pToday=new Date();
    this.pDescription= ""
    this.pDate= new Date();
    var companyDiv = (<HTMLElement>document.getElementById("justView")); 
    //var personDiv = (<HTMLElement>document.getElementById("addBody"));
    companyDiv.style.display="none";
    //personDiv.style.display="block";
  }
  selectContest(rowid:number){
    var companyDiv = (<HTMLElement>document.getElementById("justView")); 
    //var personDiv = (<HTMLElement>document.getElementById("addBody"));
    companyDiv.style.display="block";
    //personDiv.style.display="none";
    this.pActualPost=this.contests[rowid].postID;
    this.pJobName=this.contests[rowid].job;
    this.pToday=new Date(this.contests[rowid].date1.toString());
    this.pDescription= this.contests[rowid].description;
    this.pDate= new Date(this.contests[rowid].date2);
    this.dataSourceSoftware1= new MatTableDataSource(this.contests[rowid].cSoftware);
    this.dataSourceLanguage1= new MatTableDataSource(this.contests[rowid].language);
    this.dataSourceCertification1= new MatTableDataSource(this.contests[rowid].cCertificaction);
  }
  changeToEdit(){
    var companyDiv = (<HTMLElement>document.getElementById("viewContest")); 
    var personDiv = (<HTMLElement>document.getElementById("home"));
    
    personDiv.style.display="none";
    companyDiv.style.display="block";
    console.log("Entering posts");
    this.startLoadPosts();

  }

  changeToHome(){
    var companyDiv = (<HTMLElement>document.getElementById("home")); 
    var personDiv = (<HTMLElement>document.getElementById("viewContest"));
    
    personDiv.style.display="none";
    companyDiv.style.display="block";
  }

  fixDate(date:Date){
    var dateResult= (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()));
    return dateResult
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
  sendAplication(user,post){    
    fetch("http://localhost:3000/postAplication/:"+user+"/"+post, {
        "method": "POST",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          body: JSON.stringify({"user":user,"post":post})
      }).then(function(response) {
        //console.log(response);
        if(response.status ==201){            
          console.log("Application added correctly");            
        }else{            
          alert("Error adding this application");
        }
      });
  }
  getUserAplications(user,post){
    console.log(user,post)
    //console.log("Usuario:",this.userLogged)
    fetch("http://localhost:3000/postAplication/"+user+"/"+post, {
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
        //console.log("cuantos posts hay",JSON.stringify(jsonData))
        if(JSON.stringify(jsonData).length ==2){
          alert("Your application to this post has been sent.")
          this.sendAplication(user,post);
        }      
        else{
          alert("You have already applied to this job, please wait patiently for a response.")
        }    
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  startGetUserAplications(post){
    console.log("Usuario:",this.userLogged)
    fetch("http://localhost:3000/users/"+1+"/"+this.userLogged, {
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
        this.getUserAplications(jsonData[0].userid,post);        
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
          this.contests[counter].cSoftware.push({name:element.softwarename,type:element.softwaretype,required:element.needrate})
          //this.dataSourceSoftware1= new MatTableDataSource(this.contests[counter].software);
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
        console.log(jsonData);
        jsonData.forEach(element => {
          this.contests[count].cCertificaction.push(
            {
              title:element.certificationname,
              required:element.needrate
            }
          );
          
          //this.dataSourceCertification1= new MatTableDataSource(this.contests[count].certificaction);
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
        console.log(jsonData);    
        jsonData.forEach(element => {
          this.contests[count].language.push(
            {
              name: element.languagename,
              domain: element.proficiency
            }
          );
          //_this.dataSourceLanguage1= new MatTableDataSource(this.contests[count].language);
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  startLoadPosts(){
    fetch("http://localhost:3000/companyPost", {
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
        this.contests=[];
        jsonData.forEach(element=>{
          this.contests.push({
            postID:element.postid,
            job:element.jobname,
            date1:element.postdate,
            date2:element.expirationdate,
            description:element.description,
            language:[],
            cCertificaction:[],
            cSoftware:[]
            })
          this.getPostSoftwares(element.postid,count);
          this.getPostLanguages(element.postid,count);
          this.getPostCertifications(element.postid,count);
          count++;
          
        }       
        );
        this.dataSourceContest= new MatTableDataSource(this.contests);
        //this.dataSourceContest=new MatTableDataSource(this.contests);  
      })
      .catch(err => {
        console.log(err);
      })
  }

  getWorks(userPK){   
    //console.log("Entra a works") 
    fetch("http://localhost:3000/userExperience/"+userPK,{
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
          this.work.push({company:element.company,job:element.role,
            date1:element.admissiondate,date2:element.departuredate,description:element.description,active:element.activejob});
          this.dataSourceWork = new MatTableDataSource(this.work);
        });
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  getLanguages(userPK){   
    //console.log("Entra a works") 
    fetch("http://localhost:3000/newLanguage/1/"+userPK,{
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
          this.languages.push({name:element.language,domain:element.proficiency});
          this.dataSourceLanguage = new MatTableDataSource(this.languages);
        });
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }
  getSoftware(userPK){   
    //console.log("Entra a works") 
    fetch("http://localhost:3000/newSoftware/1/"+userPK,{
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
          this.software.push(this.createSoftware(element.softwarename,element.softwaretype));
          this.dataSourceSoftware = new MatTableDataSource(this.software);
        });
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }
  getCertifications(userPK){   
    //console.log("Entra a works") 
    fetch("http://localhost:3000/newCertification/1/"+userPK,{
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
          this.certificaciones.push({title:element.title,name:element.certificationgiver,year:element.certificationyear});
          this.dataSourceCertification = new MatTableDataSource(this.certificaciones);
        });
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }
  getStudies(userPK){   
    console.log("Entra a works",userPK) 
    fetch("http://localhost:3000/userStudies/"+userPK,{
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
          this.studies.push({grade:element.grade,name:element.titlegiver,year:element.graduated});
          this.dataSourceStudies = new MatTableDataSource(this.studies);
        });
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }
  getUserPK(){
    console.log("Usuario:",this.userLogged)
    fetch("http://localhost:3000/users/"+1+"/"+this.userLogged, {
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
        this.getWorks(jsonData[0].userid);
        this.getLanguages(jsonData[0].userid);
        this.getSoftware(jsonData[0].userid);
        this.getCertifications(jsonData[0].userid);
        this.getStudies(jsonData[0].userid);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  makePostLanguages(type,username,userID){
    //this.getID(username,type);      
    this.languages.forEach(async function(element){
      var language={
        "person":userID,
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
  
  makePostCertifications(type,username,userID){
    console.log(this.certificaciones)
    this.certificaciones.forEach(async function(element){
      var language={}    
      language ={
        "person":userID,
        "title":element.title,
        "certificationGiver":element.title,
        "certificationYear":element.year     
      }
      console.log(language)
      await fetch("http://localhost:3000/newCertification/:"+type, {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          //console.log(response);
          if(response.status ==201){            
            console.log("Certification added correctly");            
          }else{            
            alert("Error adding this user certifications");
          }
        });   
    });
  }
  makePostSoftware(type,username,userID){
    this.software.forEach(async function(element){
      var language={}    
      language ={
        "person":userID,
        "softwareType":element.type,
        "softwareName":element.name     
      }
      await fetch("http://localhost:3000/newSoftware/:"+type, {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          //console.log(response);
          if(response.status ==201){            
            console.log("Software added correctly");            
          }else{            
            alert("Error adding this user softwares");
          }
        });   
    });
  }
  makePostExperience(type,username,userID){
    this.work.forEach(async function(element){
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
      await fetch("http://localhost:3000/userExperience", {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(language)
        }).then(function(response) {
          //console.log(response);
          if(response.status ==201){            
            console.log("Experience added correctly");            
          }else{            
            alert("Error adding this user Experience");
          }
        });   
    });
  }
  makePostStudies(type,username,userID){
    this.studies.forEach(async function(element){
      var studies={}    
      studies ={
        "person":userID,
        "grade":element.grade,
        "titleGiver":element.name,
        "graduated":element.year     
      }
      await fetch("http://localhost:3000/userStudies", {
          "method": "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(studies)
        }).then(function(response) {
          //console.log(response);
          if(response.status ==201){            
            console.log("Studies added correctly");            
          }else{            
            alert("Error adding this user Studies");
          }
        });   
    });
  }
  async deletePostSoftware(userID){
    //this.getID(username,type);
    await fetch("http://localhost:3000/newSoftware/1/"+userID, {
        "method": "DELETE",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }).then(function(response) {
        //console.log(response);
        if(response.status ==201){            
          console.log("Software deleted correctly");            
        }else{            
          alert("Error deleting this user languages");
        }
      });
  }
  async deletePostLanguage(userID){
    //this.getID(username,type);
    await fetch("http://localhost:3000/newLanguage/1/"+userID, {
        "method": "DELETE",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }).then(function(response) {
        //console.log(response);
        if(response.status ==201){            
          console.log("Language deleted correctly");            
        }else{            
          alert("Error deleting this user languages");
        }
      });
  }
  async deletePostCertifications(userID){
    //this.getID(username,type);
    await fetch("http://localhost:3000/newCertification/1/"+userID, {
        "method": "DELETE",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }).then(function(response) {
        //console.log(response);
        if(response.status ==201){            
          console.log("Certification deleted correctly");            
        }else{            
          alert("Error deleting this user languages");
        }
      });
  }
  async deletePostExperience(userID){
    //this.getID(username,type);
    await fetch("http://localhost:3000/userExperience/"+userID, {
        "method": "DELETE",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }).then(function(response) {
        //console.log(response);
        if(response.status ==201){            
          console.log("Experience deleted correctly");            
        }else{            
          alert("Error deleting this user languages");
        }
      });
  }
  async deletePostStudies(userID){
    //this.getID(username,type);
    await fetch("http://localhost:3000/userStudies/"+userID, {
        "method": "DELETE",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }).then(function(response) {
        //console.log(response);
        if(response.status ==201){            
          console.log("Studies deleted correctly");            
        }else{            
          alert("Error deleting this user languages");
        }
      });
  }
  
  

  getData(){
    fetch("http://localhost:3000/newUserData/1/"+this.userLogged,{
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
        
        
        var user = jsonData[0]
        //console.log(user);                
        this.firstName = user.firstname
        this.lastName = user.lastname
        this.country = user.nationality
        this.birthday = user.birthday
        this.province = user.province
        this.canton = user.canton
        this.district =user.district
        this.url =user.picture
        this.email =user.mail
        this.phone =user.phone
        this.webSite =user.website
        this.getUserPK()
        //Nombre de la función a la que quiere retornar el jsonData, ya que no se puede con el return
        //FiltroCiudad(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
  }
  makePost(type,userData,userid){
    console.log(userData);
    fetch("http://localhost:3000/newUserData/:"+type, {
        "method": "PUT",
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          body: JSON.stringify(userData)
      }).then(async (response)=> {
        //console.log(response);
        if(response.status ==201){          
          alert("User updated correctly"); 
          await this.deletePostLanguage(userid);
          await this.deletePostSoftware(userid);
          await this.deletePostCertifications(userid);
          await this.deletePostExperience(userid);
          await this.deletePostStudies(userid);
          console.log("-------------------------------------------")
          //
          this.makePostLanguages(type,this.userLogged,userid);
          this.makePostSoftware(type,this.userLogged,userid);
          this.makePostCertifications(type,this.userLogged,userid);
          this.makePostExperience(type,this.userLogged,userid);
          this.makePostStudies(type,this.userLogged,userid);         

          window.location.reload();
        }else{
          alert("Error adding this user data");
        }
      });     
  }
  addUserInfo(){
    var userData;    
    if(this.firstName && this.lastName && this.country && this.province && this.canton && this.district 
      && this.email && this.phone && this.webSite && this.url){
      console.log("Usuario:",this.userLogged)
      fetch("http://localhost:3000/users/"+1+"/"+this.userLogged, {
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
          userData={          
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
          "username":this.userLogged
        }
        this.makePost(1,userData,jsonData[0].userid);
        })
        .catch(err => {
          console.log(err);
        })
      
      
    }else{
      alert("Please fill the all the user information")
    }       
  }

  addNewUser(){   
     
    if((this.firstName && this.lastName && this.country && this.province && this.canton && this.district 
      && this.email && this.phone && this.webSite && this.url && (this.languages) || this.languages.length)
      && (this.software || this.software.length) && (this.certificaciones || this.certificaciones.length)
      && (this.work || this.work.length)){
       
      this.addUserInfo();
      
      
    }else{
      alert("Check your and fill all the information");
    }
  }

}
export interface Software{
  name: string;
  type: string;
}
export interface cSoftware{
  name: string;
  type: string;
  required:boolean;
}
export interface Language{
  name: string;
  domain: string;
}
export interface cLanguage{
  name: string;
  domain: string;
}
export interface Certificacion{
  title: string;
  name: string;
  year: string;
}
export interface cCertificacion{
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
  language:cLanguage[];
  cCertificaction:cCertificacion[];
  cSoftware:cSoftware[];
}