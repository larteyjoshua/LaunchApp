import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createFood } from 'src/app/actions/food.actions';
import { AppState } from 'src/app/reducers';
import { FormServicesService } from 'src/app/services/form-services.service';
import { FoodsComponent } from '../foods/foods.component';
import { updateFood } from '../../actions/food.actions';
import { CreateFood } from '../../models/index';

@Component({
  selector: 'app-food-entry',
  templateUrl: './food-entry.component.html',
  styleUrls: ['./food-entry.component.scss']
})
export class FoodEntryComponent implements OnInit {

  imgFile: string = '';
  imgPath: string = '';
   uploadedFile: File = new File(["foo"], "../../../assets/images/lunch-icon.png", {
    type: "image/png",
  })

  // foodForm = new FormGroup({
  //   id: new FormControl('',),
  //   name: new FormControl('', [Validators.required]),
  //   ingredients : new FormControl('', [Validators.required]),
  //   price : new FormControl('', [Validators.required]),
  //   imagePath : new FormControl('', [Validators.required])
  // });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<FoodsComponent>,
    public formService: FormServicesService,
    private store: Store<AppState>,
  ) {
    this.imgPath =data.imagePath
  }

  ngOnInit(): void {
  }

  onClear() {
    this.formService.foodForm.reset();
    this.formService.initializeFoodFormGroup();
    this.imgPath = '';
  }

  onSubmit() {
    if (this.formService.foodForm.valid) {
      if (this.formService.foodForm.value.id !== null){
        console.log(' upate formData', this.formService.foodForm.value);
        let updatedFood:CreateFood = {
          "id": this.formService.foodForm.value.id,
          "name": this.formService.foodForm.value.name,
          "ingredients": this.formService.foodForm.value.ingredients,
          "price": this.formService.foodForm.value.price,
          "imagePath": this.formService.foodForm.value.imagePath
         }
        this.store.dispatch(updateFood({data:updatedFood}))

      }

      else {
        console.log('formData', this.formService.foodForm.value)
        let createFoodData:CreateFood = {
          "id": this.formService.foodForm.value.id,
          "name": this.formService.foodForm.value.name,
          "ingredients": this.formService.foodForm.value.ingredients,
          "price": this.formService.foodForm.value.price,
          "imagePath": this.formService.foodForm.value.imagePath
         }

        const formData = new FormData();
        console.log('food', createFoodData)
        formData.append('name',createFoodData.name);
        formData.append('ingredients', createFoodData.ingredients)
        formData.append('price', createFoodData.price)
        formData.append('imagePath',this.uploadedFile, this.uploadedFile.name);
        console.log('formata',formData)
      //  let newAdmin:CreateAdmin = {
      //   "fullName": this.formService.adminForm.controls['fullName'].value,
      //   "email": this.formService.adminForm.controls['email'].value,
      //   "password": this.formService.adminForm.controls['password'].value
      //  }
        // console.log('new Rider', this.formService.riderForm.value)
        this.store.dispatch(createFood({data: formData}))
      }

      this.formService.foodForm.reset();
      this.formService.initializeFoodFormGroup();
      this.onClose();
    }
  }

    onClose() {
    this.formService.foodForm.reset();
      this.formService.initializeFoodFormGroup();
      this.dialogRef.close();
    }

    onImageChange(e:any) {
      const reader = new FileReader();

    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      console.log('file', file)
      this.uploadedFile = file;
      // this.formService.foodForm.patchValue({
      //   imagePath:file
      // });
      reader.onload = () => {
        this.imgFile = reader.result as string;


      };


    }
  }

}
