import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tramarsa-layout-2',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document: any) { }

  ngOnInit(): void {
    this._document.body.classList.add('body-layout');
  }

  ngOnDestroy(): void {
    this._document.body.classList.add('body-layout');
  }

}
