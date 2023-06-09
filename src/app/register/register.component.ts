import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import liff from '@line/liff';
import { LineregisterService } from '../service/lineregister.service';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  nameline: String;
  urlimg: String;
  userid: String;

  //Chcek numberOnly
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: LineregisterService
  ) {}
  os: ReturnType<typeof liff.getOS>;
  profile: UnPromise<ReturnType<typeof liff.getProfile>>;
  ngOnInit() {
    this.nameline = this.service.GetNameLine();
    this.urlimg = this.service.GetPicLine();
    this.userid = this.service.GetUserLine();
  }

  hn: String;
  userprofileForm = new FormGroup({
    pid: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
  });

  onSubmit(event?: MouseEvent) {
    //console.log(this.userprofileForm.value);
    let url =
      'https://app1.pranangklao.go.th/DevLineAPI/ProductRESTService.svc/MobileUpdateLineRegister';
    this.http
      .post(url, {
        param: {
          ContextKey: 'ReU',
          LineUserID: this.userid,
          IDCard: this.userprofileForm.controls['pid'].value,
          TelephoneNo: this.userprofileForm.controls['tel'].value,
        },
      })
      .toPromise()
      .then((data: any) => {
        // console.log(data);
        this.hn = data.HN;
        if (this.hn != '') {
          sessionStorage.setItem('hn', data.HN);
          this.router.navigate(['']);
          //alert('TEST');
        } else {
          this.router.navigate(['notfound']);
        }
      });
  }
  onlogout(event?: MouseEvent) {
    liff.logout();
    this.router.navigate(['home']);
  }
}
