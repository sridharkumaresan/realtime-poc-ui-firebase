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

  // MatPaginator Inputs
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // pollInterval: number = 400000;
  displayedColumns: string[] = ['tier','originalDateAdded', 'issuerName', 'esmi', 'equityTicker', 'debtTicker', 'restrictionType', 'restrictionCategory'];
  dataSource = [];
  displayedDataChunk = [];
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
        (items: []) => {
          // this.dataSource = new MatTableDataSource([...items]);
          // this.dataSource.paginator = this.paginator;
          this.length = items.length;
          this.dataSource = [...items];
          this.displayedDataChunk = this.dataSource.slice(0,this.pageSize);          
          if(!this.initialLoad) {
            this.openSnackBar(items)          
          }
          if(this.initialLoad) this.initialLoad = false;
        }
      );
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.displayedDataChunk = this.dataSource.slice(firstCut, secondCut);
  }

  openSnackBar(data: any) {
    this.snackBar.openFromComponent(SnackbarMessageComponent, {
      data: data,
      duration: 2500
    })
  }

  applyFilter = (filters: any) => {
    if(filters){
      this.displayedDataChunk = [...Util.multiFilter(this.displayedDataChunk, filters)];    
    }else {
      this.getList();
    }
  }

}
