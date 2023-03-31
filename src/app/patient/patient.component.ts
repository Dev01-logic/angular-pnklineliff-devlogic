import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import liff from '@line/liff';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  data: any;
  datanotfound: Boolean = true;
  post: any;
  nameline: String;
  urlimg: String;
  hn: String;
  name: String;
  age: String;
  tmphn: String;
  //dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allUsers: any = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  os: ReturnType<typeof liff.getOS>;
  profile: UnPromise<ReturnType<typeof liff.getProfile>>;
  ngOnInit() {
    liff.init({ liffId: '1660756547-zRWjKKmP' }).then(() => {
      this.os = liff.getOS();
      if (liff.isLoggedIn()) {
        liff
          .getProfile()
          .then((profile) => {
            this.profile = profile;
            this.nameline = this.profile.displayName;
            this.urlimg = this.profile.pictureUrl;
            //console.log(this.profile.userId);
          })
          .catch(console.error);
      } else {
        liff.login();
      }
    });

    this.route.queryParams.subscribe((param) => {
      this.hn = param.HN;
    });

    let url =
      'https://app1.pranangklao.go.th/DevLineAPI/ProductRESTService.svc/EnquirePatientMaster';
    this.http
      .post(url, {
        param: {
          EnglishView: false,
          HN: this.hn,
          ContextKey: 'ReU',
        },
      })
      .subscribe((data) => {
        //this.data;
        console.log(data);
        //this.tmphn = data['ListOfDetail'].HN;
        //this.name = data['ListOfDetail'].PatientName;
        //this.age = data['ListOfDetail'].Age;
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
