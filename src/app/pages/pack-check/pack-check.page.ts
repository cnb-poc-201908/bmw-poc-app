import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-pack-check',
  templateUrl: './pack-check.page.html',
  styleUrls: ['./pack-check.page.scss'],
})
export class PackCheckPage implements OnInit {

  public categories = [];
  public content = [];
  public checkpoints = [];
  public selectedPoints = [];
  public selectedHours = 0;

  constructor(private alertCtrl: AlertController,
    private rest: RestService) { }

  ngOnInit() {
    this.content = [{
      "CHETNO": "A",
      "CHETDES": "驾驶反馈",
      "BRNO": "1",
      "BRDES": "发动机问题",
      "ASPAKNO": "CHE01",
      "ASPAKDES": "发动机问题:"
     },
     {
      "CHETNO": "A",
      "CHETDES": "驾驶反馈",
      "BRNO": "2",
      "BRDES": "仪表盘问题",
      "ASPAKNO": "CHE02",
      "ASPAKDES": "仪表盘问题:"
     },
     {
      "CHETNO": "A",
      "CHETDES": "驾驶反馈",
      "BRNO": "3",
      "BRDES": "车身抖动",
      "ASPAKNO": "CHE03",
      "ASPAKDES": "车身抖动:"
     },
     {
      "CHETNO": "A",
      "CHETDES": "驾驶反馈",
      "BRNO": "4",
      "BRDES": "刹车问题",
      "ASPAKNO": "CHE04",
      "ASPAKDES": "刹车问题:"
     },
     {
      "CHETNO": "A",
      "CHETDES": "驾驶反馈",
      "BRNO": "5",
      "BRDES": "驾驶问题",
      "ASPAKNO": "CHE05",
      "ASPAKDES": "驾驶问题:"
     },
     {
      "CHETNO": "B",
      "CHETDES": "乘坐反馈",
      "BRNO": "1",
      "BRDES": "车内噪音大",
      "ASPAKNO": "CHE06",
      "ASPAKDES": "车内噪音大:"
     },
     {
      "CHETNO": "B",
      "CHETDES": "乘坐反馈",
      "BRNO": "2",
      "BRDES": "胎噪大",
      "ASPAKNO": "CHE07",
      "ASPAKDES": "胎噪大:"
     },
     {
      "CHETNO": "B",
      "CHETDES": "乘坐反馈",
      "BRNO": "3",
      "BRDES": "座椅问题",
      "ASPAKNO": "CHE08",
      "ASPAKDES": "座椅问题:"
     },
     {
      "CHETNO": "B",
      "CHETDES": "乘坐反馈",
      "BRNO": "4",
      "BRDES": "车内空调问题",
      "ASPAKNO": "CHE09",
      "ASPAKDES": "车内空调问题:"
     },
     {
      "CHETNO": "B",
      "CHETDES": "乘坐反馈",
      "BRNO": "5",
      "BRDES": "车内娱乐系统问题",
      "ASPAKNO": "CHE10",
      "ASPAKDES": "车内娱乐系统问题:"
     },
     {
      "CHETNO": "C",
      "CHETDES": "其他反馈",
      "BRNO": "1",
      "BRDES": "外观问题",
      "ASPAKNO": "CHE11",
      "ASPAKDES": "外观问题:"
     },
     {
      "CHETNO": "C",
      "CHETDES": "其他反馈",
      "BRNO": "2",
      "BRDES": "内饰问题",
      "ASPAKNO": "CHE12",
      "ASPAKDES": "内饰问题:"
     },
     {
      "CHETNO": "C",
      "CHETDES": "其他反馈",
      "BRNO": "3",
      "BRDES": "互联驾驶问题",
      "ASPAKNO": "CHE13",
      "ASPAKDES": "互联驾驶问题:"
     }
    ]
   
    /** 
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
    */

   this.rest.getPackageList().subscribe(res=>{
    if (res && res.code === 200) {
      const packs = res.basicInfoList;
      let result = packs.filter(item=>{
        return item.RepairTypeCode === 'CHE'
      })

      let sets = new Set();
      this.content.forEach(item=>{
        sets.add(item.CHETDES)
      })

      let temp = Array.from(sets) 
      temp.forEach(item=>{
        let obj = { title : item, expand : false, points : []}
        this.content.forEach(con=>{
          if (item === con.CHETDES) {
            obj.points.push({ label : con.ASPAKDES, key : con.ASPAKNO, selected: false})
          }
        })
        this.checkpoints.push(obj)
      })

      this.checkpoints.forEach(item=>{
        item.points.forEach(pt=>{
          result.forEach(res=>{
            if (pt.key === res.PackageID) {
              pt.hours = Number(res.Laborinfo[0].LaborAmount)
            }
          })
        })
      })

      console.log(this.checkpoints)

      
    }
  })


  }

  doExpand(event,item) {
    item.expand = !item.expand;
    event.stopPropagation();
  }

  async popUpCreate() {
    const alert = await this.alertCtrl.create({
      header: '添加查修条目',
      inputs: [
        {
          name: 'input-desc',
          type: 'text',
          placeholder: '问题描述'
        },
        {
          name: 'input-hours',
          type: 'text',
          placeholder: '输入工时'
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
