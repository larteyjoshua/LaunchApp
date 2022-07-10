import { Injectable, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { CreateAdminComponent } from '../components/create-admin/create-admin.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg:any){
    return this.dialog.open(ConfirmDialogComponent,{
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "10px" },
       data :{
         message : msg
       }
     });
   }

   sharedDialog(component: any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%'
    dialogConfig.height = '60%'
    this.dialog.open(component, dialogConfig)
   }

   UserRoleDialog(component: any, action:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%'
    dialogConfig.height = '60%'
    dialogConfig.data ={
      action : action
    }
    this.dialog.open(component, dialogConfig)
   }

   BulkUsersCreatetionDialog(component: any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose =false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%'
    dialogConfig.height = '70%'
    this.dialog.open(component, dialogConfig)
   }
}
