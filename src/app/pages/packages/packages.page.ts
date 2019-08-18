import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {

  public currentTab:string = "maintenance";
  
  constructor(private rest: RestService,) { }

  ngOnInit() {
    this.rest.getEmployeeGlist().subscribe(res=>{
      if (res.code === 200) {
        console.log(res.employGroupData)
      }
    })

  }

  changeTab(event) {
    this.currentTab = event.detail.value;
  }



}
