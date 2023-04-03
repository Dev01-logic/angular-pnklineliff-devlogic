import { Component, VERSION, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import liff from '@line/liff';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LineregisterService } from '../service/lineregister.service';
import { LoaderService } from '../service/loader.service';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: LineregisterService,
    private loaderservice: LoaderService
  ) {
    sessionStorage.clear();
  }
  //.init({ liffId: '1657421042-ekawW2jw' })
  os: ReturnType<typeof liff.getOS>;
  profile: UnPromise<ReturnType<typeof liff.getProfile>>;
  ngOnInit(): void {
    //console.log('test');
    liff
      .init({ liffId: '1660756547-zRWjKKmP' })
      .then(() => {
        this.os = liff.getOS();
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              this.profile = profile;
              sessionStorage.setItem('userLine', this.profile.userId);
              sessionStorage.setItem('nameLine', this.profile.displayName);
              sessionStorage.setItem('picLine', this.profile.pictureUrl);
              //console.log(this.profile.userId);
              this.service
                .GetAll({
                  param: {
                    ContextKey: 'ReU',
                    LineUserID: this.profile.userId,
                  },
                })
                .subscribe((res) => {
                  this.data = res;
                  sessionStorage.setItem('hn', this.data.HN);

                  if (this.data.LineRegistered && this.data.HN != '') {
                    this.router.navigate(['']);
                  } else if (!this.data.LineRegistered) {
                    this.router.navigate(['register']);
                  } else {
                  }
                });
            })
            .catch(console.error);
        } else {
        }
      })
      .catch(console.error);
  }

  onClick(event?: MouseEvent) {
    liff.login();
  }
}
