import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { StoreService } from 'src/app/services/store.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pack-maintenance',
  templateUrl: './pack-maintenance.page.html',
  styleUrls: ['./pack-maintenance.page.scss'],
})
export class PackMaintenancePage implements OnInit {

  public packages = [];

  public selectedPackages = [];

  public selectedAmount  = 0;

  public selectedHours = 0;

  constructor(private rest: RestService, 
          private store: StoreService,
          public navCtrl: NavController,) { }

  ngOnInit() {
    this.rest.getPackageList().subscribe(res=>{
      if (res && res.code === 200) {
        const packs = res.basicInfoList;
        this.packages = packs.filter(item=>{
          return item.RepairTypeCode === 'MA'
        })
        this.compute()
      }
    })
  }

  compute() {
    console.log(JSON.stringify(this.packages))
    this.packages.forEach(item=>{
      let totalPartPrice = 0;
      let totalLaborPrice = 0;
      let totalLaborHours = 0;
      if (item.PartInfo && item.PartInfo.length > 0) {
        item.PartInfo.forEach(part=>{
          part.PartPrice = part.PartPrice != "" ? Number(part.PartPrice) : 0;
          part.PartsAmount = Number(part.PartsAmount)
          totalPartPrice = totalPartPrice + part.PartPrice * part.PartsAmount;
          part.PartSelected = true;
        })
      }
      if (item.Laborinfo && item.Laborinfo.length > 0) {
        item.Laborinfo.forEach(part=>{
          part.LaborPrice = part.LaborPrice != "" ? Number(part.LaborPrice) : 0;
          part.LaborAmount = Number(part.LaborAmount)
          totalLaborPrice = totalLaborPrice + part.LaborPrice * part.LaborAmount;
          totalLaborHours = totalLaborHours  + Number(part.LaborAmount);
          part.LaborSelected = true;
        })
      }
      item.totalPartPrice = totalPartPrice;
      item.totalLaborPrice = totalLaborPrice;
      item.totalLaborHours = totalLaborHours;
      item.totalPrice = totalPartPrice + totalLaborPrice;
      item.selected = false;
    })

    if (this.store.maintenanceList.length > 0) {
      this.store.maintenanceList.forEach(item=>{
        if (item.selected) {
          this.packages.forEach(pack=>{
            if (pack.PackageID === item.PackageID) {
              pack.selected = true;
              pack.Laborinfo = item.Laborinfo;
              pack.PartInfo = item.PartInfo;
              this.select(pack);
            }
          })
        }
      })
    } 

  }

  doClick(event) {
    event.stopPropagation();
  }

  select(pack) {
    let hours = 0;
    if (pack.selected == true) {
      this.selectedPackages.push(pack);
    } else {
      this.selectedPackages.splice(this.selectedPackages.findIndex(item=>item.PackageID===pack.PackageID), 1);
    }


    if (this.selectedPackages.length > 0)  {
      this.selectedPackages.forEach(item=>{
        hours = hours + item.totalLaborHours;
      })
      this.selectedHours = hours;
    } else {
      this.selectedHours = 0;
    }

    this.selectedAmount = this.selectedPackages.length;
  }

  submit() {
    this.store.maintenanceList = this.selectedPackages;
    this.navCtrl.navigateBack("/home-results");
  }

}
