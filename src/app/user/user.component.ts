import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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
  
  
  constructor(private route: ActivatedRoute) {
    this.dataSourceCertification= new MatTableDataSource(this.certificaciones);
    this.dataSourceLanguage= new MatTableDataSource(this.languages);
    this.dataSourceSoftware = new MatTableDataSource(this.software);
    this.dataSourceWork = new MatTableDataSource(this.work);
    this.dataSourceStudies= new MatTableDataSource(this.studies);

   }

  ngOnInit() {
     this.userLogged=this.route.snapshot.paramMap.get('id');
     
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

    this.work.push({company:this.pWork_Company,job:this.pWork_job,
      date1:this.fixDate(this.pWork_date1),date2:this.fixDate(this.pWork_date2),description:this.pWork_des,active:this.pWorkisChecked});
    this.dataSourceWork = new MatTableDataSource(this.work);
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
    this.studies.push({grade:this.pStudy_grade,name:this.pStudy_name,year:this.fixDate(this.pStudy_year)});
    this.dataSourceStudies = new MatTableDataSource(this.studies);
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