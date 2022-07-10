import { UserRole, UserRoleActions } from './../../models/index';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShowRole } from 'src/app/models';
import { AppState } from 'src/app/reducers';
import { FormServicesService } from 'src/app/services/form-services.service';
import { getRoles, getAdmins, getUserRole } from 'src/app/selectors/index.selectors';
import { ShowAdmin } from '../../models/index';
import { deleteCompany } from 'src/app/actions/company.actions';
import { DialogService } from 'src/app/services/dialog.service';
import { findItemId, findUserRole } from 'src/app/utils/app-utils';
import { createUserRole, deleteUserRole, updateUserRole } from '../../actions/user-role.actions';


@Component({
  selector: 'app-user-role-entry',
  templateUrl: './user-role-entry.component.html',
  styleUrls: ['./user-role-entry.component.scss']
})
export class UserRoleEntryComponent implements OnInit {

 public message:string ='';
 public roleList: Observable<ShowRole[]>;
 public listRoles:any[] =[];
 public adminList: Observable<ShowAdmin[]>;
 public listAdmins:any[] = [];
 public userRoleList: Observable<UserRole[]>;
 public listUserRole:any[] =[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<UserRoleEntryComponent>,
    public formService: FormServicesService,
    private store: Store<AppState>,
    private dialogService: DialogService,
  )
   {
    this.roleList = this.store.pipe(select(getRoles));
    this.adminList = this.store.pipe(select(getAdmins));
    this.userRoleList = this.store.pipe(select(getUserRole));
    this.message =data.action
   }

  ngOnInit(): void {
    this.roleList.subscribe((data) => {
      if (data){
      console.log(data)
      this.listRoles = data;
    }
  });

  this.adminList.subscribe((data) => {
    if (data){
    console.log(data)
    this.listAdmins = data;
  }
  });

  this.userRoleList.subscribe((data) => {
    if (data){
    console.log(data)
    this.listUserRole = data;
  }
  });
  }

  onClear() {
    this.formService.userRoleForm.reset();
    this.formService.initializeUserRoleFormGroup();
  }

  onSubmit() {
    if (this.formService.userRoleForm.valid) {
      if (this.message === UserRoleActions.create){
        console.log('create formData', this.formService.userRoleForm.value);

        const userRole = {... this.formService.userRoleForm.value}
        userRole.user_id =  userRole.user_id? Number( userRole.user_id): null
        userRole.role_id =  userRole.role_id? Number( userRole.role_id): null

        const admin = findItemId( this.listAdmins,
          userRole.user_id)
          console.log('admin', admin)

          const role =this.listRoles.find(item =>{
           return item.id === userRole.role_id
          });

            console.log('role', role,)

            const message = 'Are you sure you want to assign Role '
             + role.name + ' to  ' + admin.fullName + '?';

             this.dialogService.openConfirmDialog(message)
             .afterClosed().subscribe(res =>{
               if(res){

               this.store.dispatch(createUserRole({
                data: userRole
               }));
               }
             });
      }
      else if ( this.message === UserRoleActions.update){

        console.log('update formData', this.formService.userRoleForm.value);
        const userRole = {... this.formService.userRoleForm.value}
        userRole.user_id =  userRole.user_id? Number( userRole.user_id): null
        userRole.role_id =  userRole.role_id? Number( userRole.role_id): null

        const admin = findItemId( this.listAdmins,
          userRole.user_id)
          console.log('admin', admin)

          const role =this.listRoles.find(item =>{
           return item.id === userRole.role_id
          });

            console.log('role', role,)

            const message = 'Are you sure you want to assign Role '
             + role.name + ' to  ' + admin.fullName + '?';

             this.dialogService.openConfirmDialog(message)
             .afterClosed().subscribe(res =>{
               if(res){

               this.store.dispatch(updateUserRole({
                id: userRole.user_id,
                data: userRole
               }));
               }
             });
      }
      else if ( this.message === UserRoleActions.delete) {
        console.log('delete formData', this.formService.userRoleForm.value);

        const userRole = {... this.formService.userRoleForm.value}
        userRole.user_id =  userRole.user_id? Number( userRole.user_id): null
        userRole.role_id =  userRole.role_id? Number( userRole.role_id): null

        const admin = findItemId( this.listAdmins,
          userRole.user_id)
          console.log('admin', admin)

          const role =this.listRoles.find(item =>{
           return item.id === userRole.role_id
          });

            console.log('role', role,)

            const message = 'Are you sure you want to delete Role '
             + role.name + ' assign to  ' + admin.fullName + '?';

             this.dialogService.openConfirmDialog(message)
             .afterClosed().subscribe(res =>{
               if(res){

               this.store.dispatch(deleteUserRole({
                user_id: userRole.user_id
               }));
               }
             });
      }
    }
    this.formService.userRoleForm.reset();
    this.formService.initializeUserRoleFormGroup();
    this.onClose();
  }

    onClose() {
    this.formService.userRoleForm.reset();
      this.formService.initializeUserRoleFormGroup();
      this.dialogRef.close();
    }


}
