import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FormServicesService } from 'src/app/services/form-services.service';
import { RidersComponent } from '../riders/riders.component';
import { updateRider, createRider } from '../../actions/rider.actions';

@Component({
  selector: 'app-rider-entry',
  templateUrl: './rider-entry.component.html',
  styleUrls: ['./rider-entry.component.scss']
})
export class RiderEntryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RidersComponent>,
    public formService: FormServicesService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  onClear() {
    this.formService.riderForm.reset();
    this.formService.initializeRiderFormGroup();
  }

  onSubmit() {
    if (this.formService.riderForm.valid) {
      if (this.formService.riderForm.controls['id'].value !== null){
        console.log('formData', this.formService.riderForm.value);
        // let updatedAdmin:ShowAdmin = {
        //   "id": this.formService.adminForm.controls['id'].value,
        //   "fullName": this.formService.adminForm.controls['fullName'].value,
        //   "email": this.formService.adminForm.controls['email'].value,
        //   "password": this.formService.adminForm.controls['password'].value,
        //   "isActive": this.formService.adminForm.controls['isActive'].value === '1'? true:false
        //  }
        this.store.dispatch(updateRider({
          id: this.formService.riderForm.controls['id'].value,
          data: this.formService.riderForm.value}));
        this.formService.riderForm.reset();
        this.formService.initializeRiderFormGroup();
        this.onClose();
      }

      else {
        console.log('formData', this.formService.riderForm.value)

      //  let newAdmin:CreateAdmin = {
      //   "fullName": this.formService.adminForm.controls['fullName'].value,
      //   "email": this.formService.adminForm.controls['email'].value,
      //   "password": this.formService.adminForm.controls['password'].value
      //  }
        console.log('new Rider', this.formService.riderForm.value)
        this.store.dispatch(createRider({data: this.formService.riderForm.value}))
        this.formService.riderForm.reset();
        this.formService.initializeRiderFormGroup();
        this.onClose();
      }

    }
  }

    onClose() {
    this.formService.riderForm.reset();
      this.formService.initializeRiderFormGroup();
      this.dialogRef.close();
    }

}
