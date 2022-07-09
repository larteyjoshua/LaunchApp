import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FormServicesService } from 'src/app/services/form-services.service';
import { ShowUser, CreateUser, ShowCompany } from '../../models/index';
import { createUser, updateUser } from '../../actions/user.actions';
import { Observable } from 'rxjs';
import { getCompanies } from 'src/app/selectors/index.selectors';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent implements OnInit {

  public companyList: Observable<ShowCompany[]>;
  public listCompany:any[] =[];

  constructor(
    public dialogRef: MatDialogRef<UserEntryComponent>,
    public formService: FormServicesService,
    private store: Store<AppState>,
    ) {
      this.companyList = this.store.pipe(select(getCompanies));
    }

  ngOnInit(): void {
    this.companyList.subscribe((data) => {
      if (data){
        this.listCompany = data;
      console.log(data)
      }
      });
  }
  onClear() {
    this.formService.userForm.reset();
    this.formService.initializeUserFormGroup();
  }

  onSubmit() {
    if (this.formService.userForm.valid) {
      if (this.formService.userForm.controls['id'].value !== null){
        console.log('formData', this.formService.userForm.value);
        let updatedUser:any = {
          "id": this.formService.userForm.controls['id'].value,
          "fullName": this.formService.userForm.controls['fullName'].value,
          "email": this.formService.userForm.controls['email'].value,
          "password": this.formService.userForm.controls['password'].value,
          "isActive": this.formService.userForm.controls['isActive'].value === '1'? true:false,
          "companyId": Number(this.formService.userForm.controls['companyId'].value),
          "dateCreated": new Date()
         }
        this.store.dispatch(updateUser({
          id: this.formService.userForm.controls['id'].value,
          data: updatedUser}));
        this.formService.userForm.reset();
        this.formService.initializeUserFormGroup();
        this.onClose();
      }

      else {
        console.log('formData', this.formService.userForm.value)

       let newUser:CreateUser = {
        "fullName": this.formService.userForm.controls['fullName'].value,
        "email": this.formService.userForm.controls['email'].value,
        "password": this.formService.userForm.controls['password'].value,
        "companyId": this.formService.userForm.controls['companyId'].value
       }
        console.log('new user', newUser)
        this.store.dispatch(createUser({data:newUser}))
        this.formService.userForm.reset();
        this.formService.initializeUserFormGroup();
        this.onClose();
      }

    }
  }

    onClose() {
    this.formService.userForm.reset();
      this.formService.initializeUserFormGroup();
      this.dialogRef.close();
    }

}
