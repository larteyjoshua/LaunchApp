import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createFood } from 'src/app/actions/food.actions';
import { AppState } from 'src/app/reducers';
import { FormServicesService } from 'src/app/services/form-services.service';
import { FoodsComponent } from '../foods/foods.component';
import { updateFood } from '../../actions/food.actions';

@Component({
  selector: 'app-food-entry',
  templateUrl: './food-entry.component.html',
  styleUrls: ['./food-entry.component.scss']
})
export class FoodEntryComponent implements OnInit {

  imgFile: string = '';
  imgPath: string = '';
  uploadedFile: File = new File([""], "defualt");
  fileChange: boolean = false;



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
    const formData = new FormData();
    if (this.formService.foodForm.valid) {
      console.log(' upate formData', this.formService.foodForm.value);
      if (this.formService.foodForm.value.id !== null){
         if (this.fileChange === true) {
          formData.append('id',this.formService.foodForm.value.id);
          formData.append('name',this.formService.foodForm.value.name);
          formData.append('ingredients', this.formService.foodForm.value.ingredients)
          formData.append('price', this.formService.foodForm.value.price)
          formData.append('imagePath',this.uploadedFile, this.uploadedFile.name);
         }
         else{
          formData.append('id',this.formService.foodForm.value.id);
          formData.append('name',this.formService.foodForm.value.name);
          formData.append('ingredients', this.formService.foodForm.value.ingredients)
          formData.append('price', this.formService.foodForm.value.price)
         }


        this.store.dispatch(updateFood({data:formData}))

      }

      else {
        formData.append('name',this.formService.foodForm.value.name);
        formData.append('ingredients',this.formService.foodForm.value.ingredients)
        formData.append('price',  this.formService.foodForm.value.price)
        formData.append('imagePath',this.uploadedFile, this.uploadedFile.name);
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
      this.fileChange = true;
      this.uploadedFile = file;
      reader.onload = () => {
        this.imgFile = reader.result as string;


      };


    }
  }

}
