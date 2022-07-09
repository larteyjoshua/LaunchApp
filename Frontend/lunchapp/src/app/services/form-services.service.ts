import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class FormServicesService {

  constructor() { }

// ========================= Admin Form =================
  adminForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    isActive: new FormControl('1'),
  });

  initializeFormGroup() {
    this.adminForm.setValue({
      id: null,
      fullName: '',
      email: '',
      password: '',
      isActive: ''
    });
  }


  populateAdminForm(data:any) {
    this.adminForm.setValue(data);
  }


// ========================= User Form =================
  userForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    isActive: new FormControl('1'),
    companyId:  new FormControl(''),
  });

  initializeUserFormGroup() {
    this.userForm.setValue({
      id: null,
      fullName: '',
      email: '',
      password: '',
      isActive: '',
      companyId:''
    });
  }


  populateUserForm(data:any) {
    this.userForm.setValue(data);
  }
}
