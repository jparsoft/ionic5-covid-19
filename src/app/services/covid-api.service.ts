import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  private pathTodo = 'all';
  private pathXPais = 'countries';

  constructor(private client: HttpClient) { }

  public get<T>(path: string): Observable<T> {
    return this.client.get<T>(`${environment.baseUrl}/${path}`
    );
  }


}
