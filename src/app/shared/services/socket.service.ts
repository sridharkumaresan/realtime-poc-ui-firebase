import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

import { Restriction } from '../model/restriction';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  public initSocket() {
    this.socket = io(SERVER_URL);
  }

  public send(): void{
    this.socket.emit('newRestriction');
  }

  public onNewRestriction(): Observable<Restriction> {
    return new Observable<Restriction>(observer => {
      this.socket.on('newRestriction', (data: Restriction) => observer.next(data));
    });
  }
}
