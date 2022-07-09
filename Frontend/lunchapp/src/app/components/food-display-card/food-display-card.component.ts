import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }


}
