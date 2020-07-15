import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Coinmarketcap3Service {

  private urlEndPointCoinPrice:string = 'https://hgookgjuqg.execute-api.us-east-1.amazonaws.com/develop/coinmarketcap'
  private urlEndPointCoinInfo:string = 'https://hgookgjuqg.execute-api.us-east-1.amazonaws.com/develop/coinmarketcapinfo'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}
  
  public getCoinPrice<T>(start:number,limit:number): Observable<T> {
    return this.http.get<T>(`${this.urlEndPointCoinPrice}?start=${start}&limit=${limit}`, {headers: this.httpHeaders})
  }

  public getCoinInfo<T>(id:number[]): Observable<T>  {
    return this.http.get<T>(`${this.urlEndPointCoinInfo}?id=${id}`, {headers: this.httpHeaders})
  }

}
