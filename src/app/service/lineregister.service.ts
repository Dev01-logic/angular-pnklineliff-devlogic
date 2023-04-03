import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../service/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LineregisterService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}
  apiurl =
    'https://app1.pranangklao.go.th/DevLineAPI/ProductRESTService.svc/MobileEnquireLineRegister';
  GetAll(parameter: any) {
    return this.http.post(this.apiurl, parameter);
  }

  IsloggedIn() {
    return sessionStorage.getItem('userLine') != null;
  }
  IsHN() {
    return sessionStorage.getItem('hn') != null
      ? sessionStorage.getItem('hn')?.toString()
      : '';
  }
  GetUserLine() {
    return sessionStorage.getItem('userLine') != null
      ? sessionStorage.getItem('userLine')?.toString()
      : '';
  }
  GetNameLine() {
    return sessionStorage.getItem('nameLine') != null
      ? sessionStorage.getItem('nameLine')?.toString()
      : '';
  }
  GetPicLine() {
    return sessionStorage.getItem('picLine') != null
      ? sessionStorage.getItem('picLine')?.toString()
      : '';
  }
}
