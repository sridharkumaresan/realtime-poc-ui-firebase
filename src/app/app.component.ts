import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  navItems: Array<any> = [{page: 'Nav Link 1', icon: 'bug_report'}, {page: 'Nav Link 2', icon: 'spa'}, {page: 'Nav Link 3', icon: 'beach_access'}];
  private _mobileQueryListener: () => void;


  title = 'realtime-poc-ui';
  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher){
    this.matIconRegistry.addSvgIcon(
      `angular_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/angular-white-transparent.svg`)
    );

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
