import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPais } from '../model/pais.interface';
@Injectable({
  providedIn: 'root'
})
export class CovidApiService {


  constructor(private client: HttpClient) { }

  public get<T>(path: string): Observable<T> {
    return this.client.get<T>(`${environment.baseUrl}/${path}`
    );
  }




}
