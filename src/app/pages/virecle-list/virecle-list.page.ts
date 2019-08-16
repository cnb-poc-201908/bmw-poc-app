import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virecle-list',
  templateUrl: './virecle-list.page.html',
  styleUrls: ['./virecle-list.page.scss'],
})
export class VirecleListPage implements OnInit {

  public vericlelist: any = [];
  public vericlelistinfo: any = [];
  public dateTime: string;

  constructor(private rest: RestService, public router: Router) { }

  ngOnInit() {
    this.getVircleRecords();
    this.dateTime = new Date().toISOString().substr(0,10);
  }

  RedirectToDetail(object) {
    this.router.navigate(['search-filter'], {
        queryParams: {
          object: JSON.stringify(object)
        }
    });
}

  getVircleRecords() {
    this.rest.getBasicInfolist().subscribe( response => {
      if (response.code === 200) {
        this.vericlelistinfo = response['basicInfoList'];
        for (let i = 0; i < this.vericlelistinfo.length; i++) {
          if ( this.vericlelistinfo[i]['status'] !== 'W') {
            continue;
          }
          let regno = this.vericlelistinfo[i]['virecle_info']['regno'];
          let reservFlag = '已预约';
          if ( this.vericlelistinfo[i]['isreservation'] === 'N') {
            reservFlag = ''
          }
          let checkintime = this.vericlelistinfo[i]['checkintime']
          let jsonBasicInfo = {
            'regno': regno,
            'reservFlag': reservFlag,
            'checkintime': checkintime,
            'virecle_info': this.vericlelistinfo[i]['virecle_info'],
            'customer_info': this.vericlelistinfo[i]['customer_info']
          }
          this.vericlelist.push(jsonBasicInfo);
          this.vericlelist.sort(function( a, b ){
            let checkintimeA = a.checkintime,
            checkintimeB = b.checkintime;
            if ( checkintimeA > checkintimeB ) {
              return 1;
            }
          });
        }
      }
    })
  }
}
