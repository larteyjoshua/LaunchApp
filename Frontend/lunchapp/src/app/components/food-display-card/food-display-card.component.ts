import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { DialogService } from 'src/app/services/dialog.service';
import { FormServicesService } from 'src/app/services/form-services.service';
import { FoodEntryComponent } from '../food-entry/food-entry.component';
import { ShowFood } from '../../models/index';
import { deleteFood } from '../../actions/food.actions';

@Component({
  selector: 'app-food-display-card',
  templateUrl: './food-display-card.component.html',
  styleUrls: ['./food-display-card.component.scss']
})
export class FoodDisplayCardComponent implements OnInit {

  @Input() name: string = '';
  @Input() addedBy: string ='';
  @Input() price: number = 0;
  @Input() imagePath: string = '';
  @Input() ingredients: string ='';
  @Input() dateAdded: Date = new Date();
  @Input() id: number = 0;
  constructor(
    private store: Store<AppState>,
    public formService: FormServicesService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onEdit(id:any, name:any, addedBy:any, price:any,imagePath:any, ingredients:any ,dateAdded:any){
    let row: ShowFood = {
      id: id,
      name: name,
      ingredients: ingredients,
      price: price,
      imagePath: imagePath,
      dateAdded: dateAdded,
      addedBy:addedBy
    }
    // let updateUser:any = {
    //   "id":row.id,
    //   "fullName":row.fullName,
    //   "email": row.email,
    //   "isActive": row.isActive==true? '1':'2',
    //   "password":'',
    //   "companyId": castId
    //  }
    row.addedBy = 0
     console.log(row, '____row')
    this.formService.populateFoodForm(row);
    this.dialogService.foodDialog(FoodEntryComponent,imagePath);
  }

  onDelete(id:number){
    console.log('id', id)
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
      this.store.dispatch(deleteFood({id:id}));
      }
    });
  }


}
