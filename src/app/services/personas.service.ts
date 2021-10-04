import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private url: string = '/api/personas';

  constructor(private http: HttpClient) {}

  getPersonas(): Observable<any> {

    const {token} = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get(this.url, httpOptions)
  }
}
