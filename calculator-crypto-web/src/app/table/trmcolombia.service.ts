import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,  HttpHeaders} from '@angular/common/http'
import { TRM } from './trm.js'

@Injectable({
  providedIn: 'root'
})
export class TrmcolombiaService {

  private urlEndPoint:string = 'https://3h1vqaghcd.execute-api.us-east-1.amazonaws.com/develop/trmdolarcolombia'
  //private urlEndPoint:string = 'http://localhost:3002/develop/trmcolombia'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getTRM(date): Observable<TRM[]> {
    return this.http.get<TRM[]>(`${this.urlEndPoint}?dateFilter=${date}`, {headers: this.httpHeaders})
  }
}
