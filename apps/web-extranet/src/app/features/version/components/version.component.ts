import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

import { BaseComponent } from '@tramarsa/xplat/core';

@Component({
  selector: 'tramarsa-home',
  templateUrl: 'version.component.html',
})
export class VersionComponent extends BaseComponent implements OnInit {

  constructor(){
    super()
  }
  ngOnInit(): void {}
}
