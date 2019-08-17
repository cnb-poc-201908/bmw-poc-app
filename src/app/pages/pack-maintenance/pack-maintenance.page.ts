import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pack-maintenance',
  templateUrl: './pack-maintenance.page.html',
  styleUrls: ['./pack-maintenance.page.scss'],
})
export class PackMaintenancePage implements OnInit {

  public packages: Array<{}> = [];

  constructor() { }

  ngOnInit() {
    this.packages = [
      { 
        title: '保养/更换机油', 
        selected : false,
        prefer : true,
        price : 500,
        details : [
          {label : '全合成机油2L', amount : 2},
          {label : '机油垫片', amount : 1},
          {label : '机油滤芯', amount : 1},
        ]
      },
      { 
        title: '发动机清洗', 
        selected : false,
        prefer : false,
        price : 200,
        details : []
      },
      { 
        title: '燃油系统养护', 
        selected : false,
        prefer : true,
        price : 350,
        details : []
      },
      { 
        title: '喷油嘴清洗', 
        selected : false,
        prefer : false,
        price : 120,
        details : []
      },
      { 
        title: '水箱清洗', 
        selected : false,
        prefer : false,
        price : 80,
        details : []
      },
      { 
        title: '节气门清洗', 
        selected : false,
        prefer : true,
        price : 280,
        details : []
      },
      { 
        title: '前雨刷', 
        selected : false,
        prefer : false,
        price : 240,
        details : []
      },
      { 
        title: '空调滤清器', 
        selected : false,
        prefer : false,
        price : 50,
        details : []
      },
    ]
  }

  doClick(item) {
    item.selected = !item.selected
  }

  select() {

  }

}
