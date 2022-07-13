import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { DialogService } from 'src/app/services/dialog.service';
import { FormServicesService } from 'src/app/services/form-services.service';
import { UsersComponent } from '../users/users.component';
import {getStatus, getError, getInProgress} from '../../selectors/index.selectors'
import { UploadStatus } from 'src/app/models';
import { UploadCancelAction, UploadRequestAction, UploadResetAction } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-bulk-user-entry',
  templateUrl: './bulk-user-entry.component.html',
  styleUrls: ['./bulk-user-entry.component.scss']
})
export class BulkUserEntryComponent implements OnInit {

  status$: Observable<string>;
  completed$:boolean = false;
  progress$: Observable<number>;
  progress:number = 0;
  isReady$:boolean = false;
 isInProgress$: boolean = false;

  constructor(public dialogRef: MatDialogRef<UsersComponent>,
    private store: Store<AppState>,
    public formService: FormServicesService,
    private dialogService: DialogService
    ) {
      this.status$ = this.store.pipe(select(getStatus));
      this.progress$ = this.store.pipe(select(getInProgress));
    }

  ngOnInit(): void {
    this.status$.subscribe((data) => {
      if (data){
        console.log(data)
        if(data === UploadStatus.Completed){
          this.completed$ =true
        }
        if(data === UploadStatus.Ready){
          this.isReady$ =true
        }
      }
      });

      this.progress$.subscribe((data) => {
        if (data){
          this.progress = data
          this.isInProgress$ =true
        console.log(data)
        }
        });
      }



  onClose() {
      this.dialogRef.close();
    }

    uploadFile(event: any) {
      let fileList = (<HTMLInputElement>event.target).files;
        if (fileList && fileList.length > 0) {
          let file: File = fileList[0];

      this.store.dispatch(
         UploadRequestAction({
          file:file
        })
      );

      // clear the input form
      event.srcElement.value = null;
    }
  }

    resetUpload() {
      this.store.dispatch(UploadResetAction());
    }

    cancelUpload() {
      this.store.dispatch(UploadCancelAction());
    }

}
