import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@tramarsa/xplat/core';

@Component({
  selector: 'tramarsa-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.scss']
})

export class ProductsNewComponent extends BaseComponent implements OnInit {

  constructor(){
    super()
  }
  ngOnInit(): void {}
}
