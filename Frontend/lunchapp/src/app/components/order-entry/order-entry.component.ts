import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateUser, createUser } from 'src/app/actions/user.actions';
import { AppState } from 'src/app/reducers';
import { getRiders } from 'src/app/selectors/index.selectors';
import { FormServicesService } from 'src/app/services/form-services.service';
import { updateOrder } from '../../actions/order.actions';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.scss']
})
export class OrderEntryComponent implements OnInit {
  public ridersList: Observable<any>
  public listRiders:any[]=[];

  stages = ['delivered','shipped', 'confirm', 'withRider', 'cancel', 'pending confirmation']

  constructor(
    public dialogRef: MatDialogRef<OrderEntryComponent>,
    public formService: FormServicesService,
    private store: Store<AppState>,
  ) {
    this.ridersList = this.store.pipe(select(getRiders));
  }

  ngOnInit(): void {
    this.ridersList.subscribe((data) => {
      if (data){
      console.log('riders',data)
      this.listRiders = data;
    }
  });
  }

  onClear() {
    this.formService.orderForm.reset();
    this.formService.initializeOrderFormGroup();
  }

  onSubmit() {
    if (this.formService.orderForm.valid) {
      if (this.formService.orderForm.controls['id'].value !== null){
        console.log('formData', this.formService.orderForm.value);
        const order = {... this.formService.orderForm.value}
        order.riderId =  order.riderId? Number(order.riderId): null
        console.log('order', order)

        this.store.dispatch(updateOrder({
          id: order.id,
          data: order}));
        this.formService.orderForm.reset();
        this.formService.initializeOrderFormGroup();
        this.onClose();
      }
    }
  }

    onClose() {
    this.formService.orderForm.reset();
      this.formService.initializeOrderFormGroup();
      this.dialogRef.close();
    }

}
