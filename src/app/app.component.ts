import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMessageComponent } from './shared/components/snackbar-message/snackbar-message.component';

import { Restriction } from './shared/model/restriction';
import { SocketService } from './shared/services/socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mobileQuery: MediaQueryList;
  navItems: Array<any> = [{page: 'Home', icon: 'home'}, {page: 'Nav Link 2', icon: 'spa'}, {page: 'Nav Link 3', icon: 'beach_access'}];
  private _mobileQueryListener: () => void;


  title = 'realtime-poc-ui';
  ioConnection: any = null;

  constructor(
    public snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private socketService: SocketService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher){
    this.matIconRegistry.addSvgIcon(
      'angular_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/angular-white-transparent.svg')  
    );
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.initIoConnection();
  }

  initIoConnection() {
    // Init Socket
    this.socketService.initSocket();

    // Listen to all new Restriction creation.
    this.ioConnection = this.socketService.onNewRestriction().subscribe((data: Restriction) => {
      this.snackBar.openFromComponent(SnackbarMessageComponent, {
        data: data,
        duration: 2500
      })
    });
  }

  // Ask back-end to generate new Restriction.
  addRestriction() {
    this.socketService.send();
  }

  ngOnDestroy() {
    if(this.ioConnection) this.ioConnection.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
