import { Component, OnInit } from '@angular/core';
import { LineregisterService } from '../service/lineregister.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: LineregisterService
  ) {}

  data: any;
  groupedData = {};
  //title: String;
  //subtitle: String;

  ngOnInit() {
    let url =
      'https://app1.pranangklao.go.th/DevLineAPI/ProductRESTService.svc/EnquirePastVisit';
    this.http
      .post(url, {
        param: {
          ContextKey: 'ReU',
          HN: this.service.IsHN(),
          NoOfCumulative: '90',
        },
      })
      .subscribe((res) => {
        //console.log(res);
        this.data = res['ListPastVisitResultDetail'];
        //console.log(this.data);
        //this.title = this.data.VisitDate;
        //this.subtitle = this.data.VN;
        for (let i = 0; i < this.data.length; i++) {
          let item = this.data[i];
          let key = item.VN + item.VisitDate;
          if (!this.groupedData[key]) {
            this.groupedData[key] = {
              PrescriptionNo: [],
              VN: item.VN,
              VisitDate: item.VisitDate,
              DoctorName: [],
              ClinicName: [],
            };
          }
          this.groupedData[key].PrescriptionNo.push(item.PrescriptionNo);
          this.groupedData[key].DoctorName.push(item.DoctorName);
          this.groupedData[key].ClinicName.push(item.ClinicName);
        }
        console.log(this.groupedData);
      });
  }

  public onCardClick(item: any) {
    //console.log(item.VN);
    //console.log(item.VisitDate);
    this.router.navigate(['medicine'], {
      queryParams: {
        VisitDate: item.VisitDate,
        VN: item.VN,
        DoctorName: item.DoctorName,
      },
    });
  }
}
