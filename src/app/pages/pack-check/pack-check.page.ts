import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-pack-check',
  templateUrl: './pack-check.page.html',
  styleUrls: ['./pack-check.page.scss'],
})
export class PackCheckPage implements OnInit {

  public checkpoints = [];
  public selectedPoints = [];
  public selectedHours = 0;
  public description = "";

  constructor(private alertCtrl: AlertController,
    private rest: RestService) { }

  ngOnInit() {

   this.rest.getPackageList().subscribe(res=>{
    if (res && res.code === 200) {
      const packs = res.basicInfoList;
      let result = packs.filter(item=>{
        if (item.RepairTypeCode === 'CHE') {
          return item
        }
      })
      console.log(JSON.stringify(result))
      this.checkpoints = result;

      /** 
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
      */

      }
    })

  }

  select(item) {
    if (this.description != "") {
      this.description = this.description + "," + item.PackageName;
    } else {
      this.description = item.PackageName;
    }
    this.selectedHours = this.selectedHours + Number(item.Laborinfo[0].LaborAmount);
    this.selectedPoints.push({PackageName:item.PackageName, description: this.description});

  }




}
