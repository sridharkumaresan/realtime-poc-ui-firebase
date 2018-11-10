import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-message',
  templateUrl: './snackbar-message.component.html',
  styleUrls: ['./snackbar-message.component.scss']
})
export class SnackbarMessageComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<SnackbarMessageComponent>/* , @Inject(MAT_SNACK_BAR_DATA) public data: GridData */) { }

  ngOnInit() {
  }

}
