import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'tramarsa-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.scss']
})
export class CrumbsComponent implements OnInit {
  
  items: MenuItem[];
  home: MenuItem;
  constructor() {
    this.home = {icon: 'pi pi-home'};

    this.items = [
      {label:''}
    ];
  }

  ngOnInit(): void {
  }

}
