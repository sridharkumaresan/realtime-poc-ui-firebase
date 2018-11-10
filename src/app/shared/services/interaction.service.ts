import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class InteractionService {
    public searchTermSubject  = new Subject<string>();
    searchNotifier$ = this.searchTermSubject.asObservable();
}