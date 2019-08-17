import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-virecle-list',
  templateUrl: './virecle-list.page.html',
  styleUrls: ['./virecle-list.page.scss'],
})
export class VirecleListPage implements OnInit {

  public vericlelist: any = [];
  public vericlelistinfo: any = [];
  public dateTime: string;
  public searchKey: string;
  public ListForFilter: any = [];

  constructor(private rest: RestService, public router: Router, private camera: Camera) {
   }

  ngOnInit() {
    this.getVircleRecords();
    this.dateTime = new Date().toISOString().substr(0,10);
  }

  RedirectToDetail(object) {
    this.router.navigate(['home-results'], {
        queryParams: {
          object: JSON.stringify(object)
        }
    });
  }

  getItems(e) {
    var q = e.target.value;
    if ( q && q.trim() !== '') {
      this.vericlelist = this.ListForFilter.filter((item) => {
        item = item['regno'];
        return (item.toLowerCase().indexOf(q.toLowerCase()) > -1);
      });
    }

  }

  //search virecles
  searchFilter() {
    if ( this.searchKey === '' || this.searchKey == null ) {
      this.getVircleRecords();
    } else {
      this.rest.getBasicInfoById(this.searchKey).subscribe( res => {
        if (res.code === 200) {
          this.vericlelist.splice(0,this.vericlelist.length);
          this.vericlelistinfo = res['basicInfoList'];
          for (let i = 0; i < this.vericlelistinfo.length; i++) {
            if ( this.vericlelistinfo[i]['status'] !== 'W') {
              continue;
            }
            const regno = this.vericlelistinfo[i]['virecle_info']['regno'];
            let reservFlag = true;
            let saName = 'SA:' + this.vericlelistinfo[i]['AppointmentSA'];
            if ( this.vericlelistinfo[i]['AppointmentFlag'] !== 'Y') {
              reservFlag = false;
              saName = '';
            }
            const checkintime = this.vericlelistinfo[i]['checkintime']
            //reformat the data
            const jsonBasicInfo = {
              'regno': regno,
              'reservFlag': reservFlag,
              'checkintime': checkintime,
              'saName': saName,
              'virecle_info': this.vericlelistinfo[i]['virecle_info'],
              'customer_info': this.vericlelistinfo[i]['customer_info']
            }
            this.vericlelist.push(jsonBasicInfo);
            //sort by checktime 
            this.vericlelist.sort(function( a, b ) {
              const checkintimeA = a.checkintime,
              checkintimeB = b.checkintime;
              if ( checkintimeA > checkintimeB ) {
                return 1;
              }
            });
          }
        } else {}
      });
    }
  }

  getVircleRecords() {
    this.rest.getBasicInfolist().subscribe( response => {
      if (response.code === 200) {
        this.vericlelist.splice(0, this.vericlelist.length);
        this.vericlelistinfo = response['basicInfoList'];
        for (let i = 0; i < this.vericlelistinfo.length; i++) {
          if ( this.vericlelistinfo[i]['status'] !== 'W') {
            continue;
          }
          const regno = this.vericlelistinfo[i]['virecle_info']['regno'];
          let reservFlag = true;
          let saName = 'SA:' + this.vericlelistinfo[i]['AppointmentSA'];
          if ( this.vericlelistinfo[i]['AppointmentFlag'] !== 'Y') {
            reservFlag = false;
            saName = '';

          }
          const checkintime = this.vericlelistinfo[i]['checkintime']

          //reformat the data
          const jsonBasicInfo = {
            'regno': regno,
            'reservFlag': reservFlag,
            'checkintime': checkintime,
            'saName': saName,
            'virecle_info': this.vericlelistinfo[i]['virecle_info'],
            'customer_info': this.vericlelistinfo[i]['customer_info']
          };
          this.vericlelist.push(jsonBasicInfo);
          this.ListForFilter.push(jsonBasicInfo);
          //sort by checktime 
          this.vericlelist.sort(function( a, b ) {
            const checkintimeA = a.checkintime,
            checkintimeB = b.checkintime;
            if ( checkintimeA > checkintimeB ) {
              return 1;
            }
          });
        }
      }
    });
  }

  takePhoto() {
    const options: CameraOptions = {
     quality: 100,                                                   // 相片质量 0 -100
     destinationType: this.camera.DestinationType.DATA_URL,        // DATA_URL 是 base64   FILE_URL 是文件路径
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,                      //有PICTURE VIDEO ALLMEDIA
     saveToPhotoAlbum: true,                                       // 是否保存到相册
     sourceType: this.camera.PictureSourceType.CAMERA            //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
   }

   this.camera.getPicture(options).then((imageData) => {
     console.log('got file: ' + imageData);

      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      var img=new Image();
      img.src=base64Image;

   }, (err) => {
     console.log(err);
   });  }
}
