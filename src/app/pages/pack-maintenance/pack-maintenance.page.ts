import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

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

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.rest.getPackageList().subscribe(res=>{
      if (res && res.code === 200) {
        const packs = res.basicInfoList;
        this.packages = packs.filter(item=>{
          return item.RepairTypeCode === 'MA'
        })
        this.packages.forEach(item=>{
          let totalPartPrice = 0;
          let totalLaborPrice = 0;
          let totalLaborHours = 0;
          if (item.PartInfo && item.PartInfo.length > 0) {
            item.PartInfo.forEach(part=>{
              part.PartPrice = part.PartPrice != "" ? Number(part.PartPrice) : 0;
              totalPartPrice = totalPartPrice + part.PartPrice;
            })
          }
          if (item.Laborinfo && item.Laborinfo.length > 0) {
            item.Laborinfo.forEach(part=>{
              part.LaborPrice = part.LaborPrice != "" ? Number(part.LaborPrice) : 0
              totalLaborPrice = totalLaborPrice + part.LaborPrice;
              totalLaborHours = totalLaborHours  + Number(part.LaborAmount);
            })
          }
          item.totalPartPrice = totalPartPrice;
          item.totalLaborPrice = totalLaborPrice;
          item.totalLaborHours = totalLaborHours;
          item.totalPrice = totalPartPrice + totalLaborPrice;
          item.selected = false;
        })
      }
    })

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

}
