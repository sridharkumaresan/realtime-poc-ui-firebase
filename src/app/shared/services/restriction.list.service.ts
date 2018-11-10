import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Restriction } from '../model/restriction';
interface RestrictionList {
  restrictions: Restriction[];
}

@Injectable({
  providedIn: 'root'
})
export class RestrictionListService {
  constructor(private http: HttpClient) {}

  getRestrictionsList() {
    return this.http.get('/api/restrictions')
      .pipe(map((data:RestrictionList)  => data.restrictions));
  }
}
