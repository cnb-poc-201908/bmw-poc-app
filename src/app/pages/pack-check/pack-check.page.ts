import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { StoreService } from 'src/app/services/store.service';
import { NavController } from '@ionic/angular';

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
    private store: StoreService,
    public navCtrl: NavController,
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
      this.checkpoints = result.slice(result.length/2, result.length);

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

  submit() {
    let checkObj = this.checkpoints.find(item=>item.PackageID === 'NCC');
    checkObj.PackageName = this.description;
    checkObj.Laborinfo[0].LaborAmount = this.selectedHours;
    this.store.checkList = [];
    this.store.checkList.push(checkObj);
    this.navCtrl.navigateBack("/home-results");
  }



}
