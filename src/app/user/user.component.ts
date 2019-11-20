import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
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