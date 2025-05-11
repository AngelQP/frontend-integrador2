import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tramarsa-error-handler',
  templateUrl: './error.handler.component.html',
  styleUrls: ['./error.handler.component.scss']
})
export class ErrorHandlerComponent implements OnInit {

  constructor() { }

  @Input() message:any
  @Input() icon:any
  @Input() zindex:any

  @Output() onClose : EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  close(){
    this.onClose.emit();
  }
}
