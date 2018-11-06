import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as Filtersetting from './filters';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output('filterChanges') filterChanges: EventEmitter<any> = new EventEmitter();
  @ViewChild('mep') mep: MatExpansionPanel;
  formGroup: FormGroup;
  error: string;
  searchFor;

  restrictionCategoryList: Array<any>;
  restrictionTypeList: Array<any>;
  tierList: Array<any>;
  filters: any = null;
  panelOpenState: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      issuerName: [],
      itemType: [],
      restrictionCategory: [],
      restrictionType: [],
      tier: []
    })
  }

  initializeForm() {
    this.restrictionCategoryList = Filtersetting.Filters.restrictionCategory;
    this.restrictionTypeList = Filtersetting.Filters.restrictionType;
    this.tierList = Filtersetting.Filters.tier;
  }

  applyFilter() {
    // this.panelOpenState = false;
    this.mep.close();
    let controls = this.formGroup.controls;
    let filters = this.filters = Object.assign({}, ...Object.keys(controls)
                    .map(k => { 
                      let value = controls[k].value 
                                    ? Array.isArray(controls[k].value) 
                                      ? controls[k].value 
                                      : [controls[k].value]
                                    : [];
                      return {[k]: value} 
                    }))
    this.filterChanges.emit(filters);
  }

  removeFilter() {
    this.formGroup.reset();
    // this.panelOpenState = false;
    this.mep.close();
    this.filters = null
    this.filterChanges.emit(this.filters);
  }
}
