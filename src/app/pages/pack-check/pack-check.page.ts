import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pack-check',
  templateUrl: './pack-check.page.html',
  styleUrls: ['./pack-check.page.scss'],
})
export class PackCheckPage implements OnInit {

  public checkpoints: Array<{}> = [];
  public selectedHours: Number = 0;

  constructor() { }

  ngOnInit() {
    this.checkpoints = [
      {
        title : '发动机',
        expand : false,
        points : [
          {label : '发动机问题1', key : "00001", selected : false},
          {label : '发动机问题2', key : "00002", selected : false},
          {label : '发动机问题3', key : "00003", selected : false},
          {label : '发动机问题4', key : "00004", selected : false},
        ]
      },
      {
        title : '异响',
        expand : false,
        points : [
          {label : '异响问题1', key : "00011", selected : false},
          {label : '异响问题2', key : "00012", selected : false},
          {label : '异响问题3', key : "00013", selected : false},
          {label : '异响问题4', key : "00014", selected : false},
        ]
      },

    ]
  }

  doExpand(event,item) {
    item.expand = !item.expand;
    event.stopPropagation();
    
  }

}
