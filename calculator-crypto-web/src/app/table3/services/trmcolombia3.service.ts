import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,  HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class Trmcolombia3Service {

  private urlEndPoint:string = 'https://3h1vqaghcd.execute-api.us-east-1.amazonaws.com/develop/trmdolarcolombia'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getTRM<T>(date:string): Observable<T> {
    return this.http.get<T>(`${this.urlEndPoint}?dateFilter=${date}`, {headers: this.httpHeaders})
  }
}
