import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataGridService } from './data-grid.service';
import { Restriction } from '../shared/model/restriction';
import { SnackbarMessageComponent } from '../shared/components/snackbar-message/snackbar-message.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Util from '../shared/utils/util';

@Component({
  selector: 'app-restriction-list-fb',
  templateUrl: './restriction-list-fb.component.html',
  styleUrls: ['./restriction-list-fb.component.scss']
})
export class RestrictionListFbComponent implements OnInit, OnDestroy {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;   
  // pollInterval: number = 400000;
  displayedColumns: string[] = ['tier','originalDateAdded', 'issuerName', 'esmi', 'equityTicker', 'debtTicker', 'restrictionType', 'restrictionCategory'];
  dataSource;
  initialLoad: boolean = true;

  newItem: Restriction;
  newItemSubscription: Subscription = new Subscription();
  itemListSubscription: Subscription = new Subscription();

  constructor(
    public snackBar: MatSnackBar, 
    private gridService: DataGridService) {
      this.getList();
  }

  ngOnInit() {
    
  }
  
  ngOnDestroy() {
    if(this.newItemSubscription) this.newItemSubscription.unsubscribe();
    if(this.itemListSubscription) this.itemListSubscription.unsubscribe();
  }

  getList = () => {
    this.newItemSubscription = this.gridService.getPRLList()
      .subscribe(
        (items: Restriction[]) => {
          this.dataSource = new MatTableDataSource([...items]);
          this.dataSource.paginator = this.paginator;
          if(!this.initialLoad) {
            this.openSnackBar(items)          
          }
          if(this.initialLoad) this.initialLoad = false;
        }
      );
  }

  openSnackBar(data: any) {
    this.snackBar.openFromComponent(SnackbarMessageComponent, {
      data: data,
      duration: 2500
    })
  }

  applyFilter = (filters: any) => {
    if(filters){
      this.dataSource = [...Util.multiFilter(this.dataSource.data, filters)];    
    }else {
      this.getList();
    }
  }

}
