import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tramarsa-message-result',
  templateUrl: './message-result.component.html',
  styleUrls: ['./message-result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageResultComponent implements OnInit {

  constructor() { }
   
  @Input() message:any

  @Input() styleClassIcon:any

  @Input() styleClassMessage:any

  @Input() styleClassContainer:any
  
  ngOnInit(): void {
  }

}
