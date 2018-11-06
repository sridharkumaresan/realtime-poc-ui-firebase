import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import Util from './util';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataGridService {

  private insertNotifier  = new BehaviorSubject(null);
  insertNotifier$ = this.insertNotifier.asObservable();

  constructor(
    private http: HttpClient, 
    private db: AngularFireDatabase) { 
  }

  //Generate on random data and returns a observable
  getPRLItem = (): Observable<any> => Observable.create( 
      observer => {
        observer.next(this.generateRandomGridData(1))
      }
    );
  
  //Generate n number of Random GridData using the util function
  generateRandomGridData = (count: number = 1) => Array(count).fill(1).map(_ => Util.getRandomGridData());
  
  getPRLList = () => this.db.list('/').valueChanges();

  getOnePRLItem = (id) => this.db.object(`/${id}`).valueChanges();

  addPRLItem = (count: number = 1) => {
    this.generateRandomGridData(count).forEach(data => {
      this.db.list('/').push(data).then(
        (result: any) => {
          this.getOnePRLItem(result.key).subscribe(
            newItem => {
              this.insertNotifier.next(newItem);
            }
          );
        }
      )
    })
  }

  
}
