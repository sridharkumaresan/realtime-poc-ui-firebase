import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

// Wijmo imports
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';

import { FlexGrid } from 'wijmo/wijmo.grid';
import { FlexGridFilter } from 'wijmo/wijmo.grid.filter';

import { Restriction } from '../shared/model/restriction';
import { RestrictionListService } from '../shared/services/restriction.list.service';
import { Subscription } from 'rxjs';
import Util from '../shared/utils/util';

@Component({
  selector: 'app-restriction-list-wj',
  templateUrl: './restriction-list-wj.component.html',
  styleUrls: ['./restriction-list-wj.component.scss']
})
export class RestrictionListWjComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['tier','originalDateAdded', 'issuerName', 'esmi', 'equityTicker', 'debtTicker', 'restrictionType', 'restrictionCategory'];
  dataSource: Restriction[] = [];

  loading: boolean = true;
  itemListSubscription: Subscription = new Subscription();

  private flexGridFilter: FlexGridFilter;
  constructor(private restrictionListService: RestrictionListService) {}

  ngOnInit() {
    // Get the existing restrictions
    this.getRestrictionList();
  }

  ngOnDestroy() {
    // Unsubscribe things here.
    if(this.itemListSubscription) this.itemListSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // Hide Wijmo wijmoLicense tooltip.
    const allDivs =  document.getElementsByTagName('div');
    let wijmoLicense = allDivs[allDivs.length - 1];
    wijmoLicense.style.display = 'none';
  }

  getRestrictionList = () => {
    this.itemListSubscription = this.restrictionListService.getRestrictionsList().subscribe((data: Restriction[]) => {
      this.dataSource = [...data];
      this.loading = false;
    });
  }

  applyFilter = (filters: any) => {
    if(filters){
      this.dataSource = <Restriction[]>[...Util.multiFilter(this.dataSource, filters)];
    }else {
      this.getRestrictionList();
    }
  }

  initGrid(grid: FlexGrid) {
    grid.columnHeaders.rows.defaultSize = 40;
    grid.rows.defaultSize = 30;
    this.flexGridFilter = new FlexGridFilter(grid);
  }
}
