import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-bulk-user-entry',
  templateUrl: './bulk-user-entry.component.html',
  styleUrls: ['./bulk-user-entry.component.scss']
})
export class BulkUserEntryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UsersComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
      this.dialogRef.close();
    }


}
