import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineregisterService } from '../service/lineregister.service';
export enum ToggleEnum {
  Option1,
  Option2,
}

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
})
export class MedicineComponent implements OnInit {
  visitdate: String;
  vn: String;
  doctor: String;
  data: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: LineregisterService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.vn = param.VN;
      this.visitdate = param.VisitDate;
      this.doctor = param.DoctorName;
    });

    let url =
      'https://app1.pranangklao.go.th/DevLineAPI/ProductRESTService.svc/EnquireOPDMedicine';
    this.http
      .post(url, {
        param: {
          ContextKey: 'ReU',
          HN: this.service.IsHN(),
          VN: this.vn,
          VisitDate: this.visitdate,
          GetAllPrescriptionNo: true,
          RequireImageMedicine: false,
          RequireStockCategory: false,
        },
      })
      .subscribe((res) => {
        this.data = res['ListResultDetail'];
      });
  }
  //this.router.navigate(['register']);
  public onCardClick() {
    this.router.navigate([''], {
      queryParams: {
        show: 'his',
      },
    });
  }

  toggleEnum = ToggleEnum;
  selectedState = ToggleEnum.Option2;
  onChange($event) {
    //console.log($event.value);
    this.selectedState = $event.value;
    if ($event.value == '0') {
      this.router.navigate([''], {
        queryParams: {
          show: 'app',
        },
      });
    } else if ($event.value == '1') {
      this.router.navigate([''], {
        queryParams: {
          show: 'his',
        },
      });
    } else {
    }
  }
  public onClick(event: any): void {
    //console.log(event.value);
    this.router.navigate([''], {
      queryParams: {
        show: 'his',
      },
    });
  }
}
