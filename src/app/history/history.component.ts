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
  title: String;
  subtitle: String;

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
        console.log(res);
        this.data = res['ListPastVisitResultDetail'];
        console.log(this.data);
        this.title = this.data.VisitDate;
        this.subtitle = this.data.VN;
      });
  }
  public onCardClick(item: any) {
    console.log(item.VN);
    console.log(item.VisitDate);
  }
}
