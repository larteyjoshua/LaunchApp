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



  // ========================= Company Form =================
  companyForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNumber: new FormControl('', Validators.required),
    isActive: new FormControl('1'),
    location:  new FormControl('',  Validators.required),
    dateAdded:  new FormControl('', ),

  });

  initializeCompanyFormGroup() {
    this.companyForm.setValue({
      id: null,
      name: '',
      email: '',
      phoneNumber: '',
      isActive: '',
      location:'',
      dateAdded: ''
    });
  }

  populateCompanyForm(data:any) {
    this.companyForm.setValue(data);
  }



    // ========================= Rider Form =================
    riderForm: FormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      tellNumber: new FormControl('', Validators.required),
      motorNumber:  new FormControl('',  Validators.required),
      addedBy: new FormControl(0),
      dateAdded: new FormControl(new Date())
    });

    initializeRiderFormGroup() {
      this.riderForm.setValue({
        id: null,
        name: '',
        email: '',
        tellNumber: '',
        motorNumber: '',
        addedBy:0,
        dateAdded: new Date()
      });
    }

    populateRiderForm(data:any) {
      this.riderForm.setValue(data);
    }


        // ========================= Order Form =================
        orderForm: FormGroup = new FormGroup({
          id: new FormControl(null),
          foodId: new FormControl(),
          totalNumber: new FormControl,
          userId: new FormControl(),
          destination: new FormControl(),
          orderDate: new FormControl(new Date()),
          trackingStage: new FormControl(''),
          riderId: new FormControl(),
          cost: new FormControl()
        });

        initializeOrderFormGroup() {
          this.orderForm.setValue({
          id: null,
          foodId:null,
          totalNumber: null,
          userId: null ,
          destination: '' ,
          orderDate: new Date(),
          trackingStage: '',
           riderId: null ,
          cost: null,
          });
        }

        populateOrderForm(data:any) {
          this.orderForm.setValue(data);
        }


        // ========================= UserRole Form =================
        userRoleForm: FormGroup = new FormGroup({
          role_id: new FormControl(null),
          user_id: new FormControl(),
        });

        initializeUserRoleFormGroup() {
          this.userRoleForm.setValue({
            role_id: null ,
            user_id: null,
          });
        }

        populateUserRoleForm(data:any) {
          this.userRoleForm.setValue(data);
        }
}
