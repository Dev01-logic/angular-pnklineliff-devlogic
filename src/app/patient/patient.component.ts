import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import liff from '@line/liff';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LineregisterService } from '../service/lineregister.service';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  data: any;
  parsedJson: any;
  datanotfound: Boolean = true;
  post: any;
  nameline: String;
  urlimg: String;
  hn: String;
  name: String;
  age: String;
  tmphn: String;
  userid: String;
  idcard: String;
  //dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allUsers: any = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: LineregisterService
  ) {}

  ngOnInit() {
    this.nameline = this.service.GetNameLine();
    this.urlimg = this.service.GetPicLine();
    this.userid = this.service.GetUserLine();

    let url =
      'https://app1.pranangklao.go.th/DevLineAPI/ProductRESTService.svc/EnquirePatientMaster';
    this.http
      .post(url, {
        param: {
          EnglishView: false,
          HN: this.service.IsHN(),
          ContextKey: 'ReU',
        },
      })
      .subscribe((data) => {
        //this.data;
        //console.log(data);
        this.data = JSON.stringify(data['ListOfDetail']);
        this.parsedJson = JSON.parse(this.data);
        //console.log(this.parsedJson);
        this.tmphn = this.parsedJson[0].HN;
        this.name = this.parsedJson[0].PatientName;
        this.age = this.parsedJson[0].Age;
        this.idcard = this.parsedJson[0].IDCard;
        //this.data = response.data;
        //this.datanotfound = data['DataNotFound'];
        //console.log(this.datanotfound);
        //this.data = data['ListResultDetail'];
        //console.log(this.data);
      });
  }

  onlogout(event?: MouseEvent) {
    liff.logout();
    this.router.navigate(['home']);
  }
}
