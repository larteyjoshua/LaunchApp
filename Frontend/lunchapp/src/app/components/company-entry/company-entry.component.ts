import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {  CreateAdmin } from 'src/app/models';
import { AppState } from 'src/app/reducers';
import { FormServicesService } from 'src/app/services/form-services.service';
import { CompaniesComponent } from '../companies/companies.component';
import { ShowCompany, CreateCompany } from '../../models/index';
import { createCompany, updateCompany } from '../../actions/company.actions';

@Component({
  selector: 'app-company-entry',
  templateUrl: './company-entry.component.html',
  styleUrls: ['./company-entry.component.scss']
})
export class CompanyEntryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CompaniesComponent>,
    public formService: FormServicesService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  onClear() {
    this.formService.companyForm.reset();
    this.formService.initializeCompanyFormGroup();
  }

  onSubmit() {
    if (this.formService.companyForm.valid) {
      if (this.formService.companyForm.controls['id'].value !== null){
        console.log('formData', this.formService.companyForm.value);
        let updatedCompany:ShowCompany = {
          "id": this.formService.companyForm.controls['id'].value,
          "name": this.formService.companyForm.controls['name'].value,
          "email": this.formService.companyForm.controls['email'].value,
          "phoneNumber": this.formService.companyForm.controls['phoneNumber'].value,
          "isActive": this.formService.companyForm.controls['isActive'].value === '1'? true:false,
          "location": this.formService.companyForm.controls['location'].value,
          "dateAdded": this.formService.companyForm.controls['dateAdded'].value

         }
        this.store.dispatch(updateCompany({
          id: this.formService.companyForm.controls['id'].value,
          data: updatedCompany}));
        this.formService.companyForm.reset();
        this.formService.initializeCompanyFormGroup();
        this.onClose();
      }

      else {
        console.log('formData', this.formService.companyForm.value)

       let newcompany:CreateCompany = {
        "name": this.formService.companyForm.controls['name'].value,
        "email": this.formService.companyForm.controls['email'].value,
        "phoneNumber": this.formService.companyForm.controls['phoneNumber'].value,
        "location": this.formService.companyForm.controls['location'].value
       }
        console.log('new company', newcompany)
        this.store.dispatch(createCompany({data: newcompany}))
        this.formService.companyForm.reset();
        this.formService.initializeCompanyFormGroup();
        this.onClose();
      }
    }
  }

    onClose() {
    this.formService.adminForm.reset();
      this.formService.initializeCompanyFormGroup();
      this.dialogRef.close();
    }


}
