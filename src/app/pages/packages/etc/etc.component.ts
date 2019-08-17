import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab-etc',
  templateUrl: './etc.component.html',
  styleUrls: ['./etc.component.scss']
})
export class EtcComponent implements OnInit {

  items = [
    {text: '加油', value: '200元'},
    {text: '加油', value: '100元'}
  ];
  constructor() { }

  ngOnInit() {
  }

  addItem() {
    this.items.push({text: '加油', value: '300元'});
  }

}
