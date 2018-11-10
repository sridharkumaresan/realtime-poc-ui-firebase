import { Component } from '@angular/core';
import { SocketService } from '../shared/services/socket.service';
import { DataGridService } from '../restriction-list-fb/data-grid.service';

@Component({
  selector: 'app-add-restriction',
  templateUrl: './add-restriction.component.html',
  styleUrls: ['./add-restriction.component.scss'],
})
export class AddRestrictionComponent {
  constructor(private socketService: SocketService,
    private dataGridService: DataGridService) { }

  // Ask back-end to generate new Restriction.
  add() {
    // Add through Socket
    this.socketService.send();
    // Add through Firebase
    this.dataGridService.addPRLItem();
  }
}
