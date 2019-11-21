import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router'
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
  results$:Contest[]=[{ job:"string",
    date1:"11-11-2019",
    date2:new Date().toDateString(),
    description:"The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."}
  ,{job:"string2",
  date1:"string2",
  date2:new Date().toDateString(),
  description:"The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."}];
  /////
  dato=this.results$[0].date2
  
  pJobName:string;
  pToday= new Date();
  pDescription:string;
  pDate=new Date();
  //Certifications
  certificaciones:Certificacion[]=[];
  pCertificado_Title: string;
  pCertificado_name:string;
  pCertificado_year=new Date();
  displayedColumnsCertification = ["Title", "Name of place","Date of graduation","action"];
  dataSourceCertification: MatTableDataSource<Certificacion>;

    //Columnas de Software
    displayedColumnsSoftware = ["Software", "type","action"];
    dataSourceSoftware: MatTableDataSource<Software>;
    pSoftwareType:string;
    pSoftware:string;
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

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.userLogged=this.route.snapshot.paramMap.get('id');
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
    this.results$.push({
      job:this.pJobName,date1:this.pToday.toDateString(),date2:this.pDate.toDateString(),description:this.pDescription
    })
    this.contests.push({
      job:this.pJobName,date1:this.pToday.toDateString(),date2:this.pDate.toDateString(),description:this.pDescription
    })
    this.dataSourceContest= new MatTableDataSource(this.contests);
  }
  deleteContest(rowid:number){
    if (rowid > -1) {
      this.contests.splice(rowid, 1);
      this.dataSourceContest = new MatTableDataSource(this.contests);
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
    
    this.software.push(this.createSoftware(this.pSoftware,this.pSoftwareType));
    this.dataSourceSoftware = new MatTableDataSource(this.software);
    
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
    fetch("http://localhost:3000/newUserData/2/"+'C2',{
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
    
    this.certificaciones.push({title:this.pCertificado_Title,name:this.pCertificado_name,year:this.fixDate(this.pCertificado_year)});
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
export interface Contest{
  job:string;
  date1:string;
  date2:string;
  description:string;
  /*
  language:Language;
  certificaction:Certificacion;
  software:Software;*/
}