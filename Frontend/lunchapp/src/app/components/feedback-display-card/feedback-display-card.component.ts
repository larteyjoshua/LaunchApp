import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-display-card',
  templateUrl: './feedback-display-card.component.html',
  styleUrls: ['./feedback-display-card.component.scss']
})
export class FeedbackDisplayCardComponent implements OnInit {

  @Input() foodName: string = '';
  @Input() stars: number = 0;
  @Input() imagePath: string = '';
  @Input() ingredients: string ='';
  @Input() dateCommented: Date = new Date();
  @Input() id: number = 0;
  @Input() comment: string ='';
  @Input() commentBy: string ='';


  constructor() { }

  ngOnInit(): void {
  }

}
