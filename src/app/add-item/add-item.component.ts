import { Component, OnInit } from '@angular/core';
import { DataGridService } from '../data-grid/data-grid.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(private dataGridService: DataGridService) { }

  ngOnInit() {
    
  }
  
  add() {
    this.dataGridService.addPRLItem();
  }

  

}
