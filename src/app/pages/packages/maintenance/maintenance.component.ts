import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  public packages: Array<{}> = [];

  constructor() { }

  ngOnInit() {
    this.packages = [
      { 
        title: '保养/更换机油', 
        selected : false,
        prefer : true,
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
        details : []
      },
      { 
        title: '燃油系统养护', 
        selected : false,
        prefer : true,
        details : []
      },
      { 
        title: '发动机清洗', 
        selected : false,
        prefer : false,
        details : []
      },
      { 
        title: '水箱清洗', 
        selected : false,
        prefer : false,
        details : []
      },
      { 
        title: '节气门清洗', 
        selected : false,
        prefer : true,
        details : []
      },
      { 
        title: '前雨刷', 
        selected : false,
        prefer : false,
        details : []
      },
      { 
        title: '空调滤清器', 
        selected : false,
        prefer : false,
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
