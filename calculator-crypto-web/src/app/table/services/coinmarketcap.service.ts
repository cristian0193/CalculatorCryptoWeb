import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoinmarketcapService {

  //private urlEndPointCoinPrice:string = 'https://hgookgjuqg.execute-api.us-east-1.amazonaws.com/develop/coinmarketcap'
  private urlEndPointCoinPrice:string = 'http://localhost:3002/develop/coinmarketcap'
  private urlEndPointCoinInfo:string = 'http://localhost:3002/develop/coininfologo'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}
  
  getCoinPrice(start:string,limit:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlEndPointCoinPrice}?start=${start}&limit=${limit}`, {headers: this.httpHeaders})
  }

  getCoinInfo(id:number): Observable<any[]>  {
    return this.http.get<any[]>(`${this.urlEndPointCoinInfo}?id=${id}`, {headers: this.httpHeaders})
  }
}
