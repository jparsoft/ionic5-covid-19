import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
