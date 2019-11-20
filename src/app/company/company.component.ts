import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  
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
  constructor() { }

  ngOnInit() {
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
  }
  goToContest(){
    var companyDiv = (<HTMLElement>document.getElementById("container2")); 
    var personDiv = (<HTMLElement>document.getElementById("container1"));
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
  //addCertification

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
}