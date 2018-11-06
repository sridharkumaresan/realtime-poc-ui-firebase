import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GridData } from './grid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMessageComponent } from './shared/snackbar-message/snackbar-message.component';
import Util from './util';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;   
  // pollInterval: number = 400000;
  displayedColumns: string[] = ['tier','originalDateAdded', 'issuerName', 'esmi', 'equityTicker', 'debtTicker', 'restrictionType', 'restrictionCategory'];
  dataSource;
  initialLoad: boolean = true;

  newItem: GridData;
  newItemSubscription: Subscription = new Subscription();
  itemListSubscription: Subscription = new Subscription();

  constructor(
    public snackBar: MatSnackBar, 
    private gridService: DataGridService) {

    //Generate 10 random data on page load using the randomData generator utility
    // this.dataSource = this.gridService.generateRandomGridData(50);
  
    this.getList();
    
  }

  ngOnInit() {
    //Add the newly generated DataGrid item to dataSource property
    // this.newItemSubscription = this.getPRLItem().subscribe((data: GridData[]) => {
    //   this.newItem = data[0];
    //   this.openSnackBar(this.newItem);
    //   this.dataSource = [...this.dataSource, this.newItem];
    // })
    
  }
  
  ngOnDestroy() {
    if(this.newItemSubscription) this.newItemSubscription.unsubscribe();
    if(this.itemListSubscription) this.itemListSubscription.unsubscribe();
  }

  getList = () => {
    this.newItemSubscription = this.gridService.getPRLList()
      .subscribe(
        (items: GridData[]) => {
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

  //poll the getPRLItem service to get one random generated DataGrid item
  // getPRLItem = () => {
  //   return interval(this.pollInterval).pipe(
  //     switchMap(() => this.gridService.getPRLItem())
  //   )
  // }
}


