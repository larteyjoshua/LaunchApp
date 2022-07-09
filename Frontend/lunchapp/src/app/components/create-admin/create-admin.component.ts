import { createAdmin } from './../../actions/admin.actions';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FormServicesService } from 'src/app/services/form-services.service';
import { AdminsComponent } from '../admins/admins.component';
import { CreateAdmin } from 'src/app/models';
import { updateAdmin } from '../../actions/admin.actions';
import { ShowAdmin } from '../../models/index';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminsComponent>,
    public formService: FormServicesService,
    private store: Store<AppState>,
    ) { }

  onClear() {
    this.formService.adminForm.reset();
    this.formService.initializeFormGroup();
  }

  onSubmit() {
    if (this.formService.adminForm.valid) {
      if (this.formService.adminForm.controls['id'].value !== null){
        console.log('formData', this.formService.adminForm.value);
        let updatedAdmin:ShowAdmin = {
          "id": this.formService.adminForm.controls['id'].value,
          "fullName": this.formService.adminForm.controls['fullName'].value,
          "email": this.formService.adminForm.controls['email'].value,
          "password": this.formService.adminForm.controls['password'].value,
          "isActive": this.formService.adminForm.controls['isActive'].value === '1'? true:false
         }
        this.store.dispatch(updateAdmin({
          id: this.formService.adminForm.controls['id'].value,
          data: updatedAdmin}));
        this.formService.adminForm.reset();
        this.formService.initializeFormGroup();
        this.onClose();
      }

      else {
        console.log('formData', this.formService.adminForm.value)

       let newAdmin:CreateAdmin = {
        "fullName": this.formService.adminForm.controls['fullName'].value,
        "email": this.formService.adminForm.controls['email'].value,
        "password": this.formService.adminForm.controls['password'].value
       }
        console.log('new Admin', newAdmin)
        this.store.dispatch(createAdmin({data:newAdmin}))
        this.formService.adminForm.reset();
        this.formService.initializeFormGroup();
        this.onClose();
      }

    }
  }

    onClose() {
    this.formService.adminForm.reset();
      this.formService.initializeFormGroup();
      this.dialogRef.close();
    }


  ngOnInit(): void {
  }

}
