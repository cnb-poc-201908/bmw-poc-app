import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { LoadingController, Platform, ActionSheetController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

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
  selectedImage: string;
  imageText: string;
  constructor(private rest: RestService, 
    public router: Router, private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loading: LoadingService) {
   }

   getPicture(sourceType: PictureSourceType) {
     this.selectedImage = "";
     this.imageText = "";
    if (this.platform.is('cordova')) {
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then((imageData) => {
            this.selectedImage = `data:image/jpeg;base64,${imageData}`;
            let data = {
              "image":imageData,
              "configure":{
                "multi_crop":false
              }
            };this.loading.present();
            this.rest.getVehiclePlate(data).subscribe((res:any)=>{this.loading.dismiss();
              if(res.success){
                this.imageText = res.plates[0].txt;
              }
            });
        });
    } else {
        alert('cordova not available');
    }

}
   async selectSource() {
    const actionSheet = await this.actionSheetCtrl.create({
        header: 'Select Source',
        buttons: [
            {
                text: 'Capture Image',
                role: 'camera',
                icon: 'camera',
                handler: () => {
                    return this.getPicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
              text: 'Use Libary',
              role: 'libary',
              icon: 'folder-open',
              handler: () => {
                  return this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
          }
        ]
    });
    await actionSheet.present();
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

/*
  getItems(e) {
    var q = e.target.value;
    if ( q && q.trim() !== '') {
      this.vericlelist = this.ListForFilter.filter((item) => {
        item = item['REGNO'];
        return (item.toLowerCase().indexOf(q.toLowerCase()) > -1);
      });
    }

  }
  */

  //search virecles
  searchFilter(e) {
    if ( e.target.value === null || e.target.value.trim() === '' ) {
      return;
    }
    this.rest.getBasicInfoById(e.target.value).subscribe( res => {
      if (res.code === 200) {
        this.vericlelist.splice(0,this.vericlelist.length);
        this.vericlelistinfo = res['basicInfoList'];
        for (let i = 0; i < this.vericlelistinfo.length; i++) {
          if ( this.vericlelistinfo[i]['STATUS'] !== 'w') {
              continue;
            }
          const regno = this.vericlelistinfo[i]['VEHICLE']['REGNO'];
          let reservFlag = true;
          let saName = 'SA:' + this.vericlelistinfo[i]['BOOKSA'];
          if ( this.vericlelistinfo[i]['BOOKF'] !== 'Y') {
              reservFlag = false;
              saName = '';
          }
          const checkintime = this.vericlelistinfo[i]['ARRIVALTIME'];
          const jsonBasicInfo = {
              'regno': regno,
              'reservFlag': reservFlag,
              'checkintime': checkintime,
              'saName': saName,
              'virecle_info': this.vericlelistinfo[i]['VEHICLE'],
              'customer_info': this.vericlelistinfo[i]['CUSTOMER']
          };
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
      }
      else {
        this.vericlelist.splice(0, this.vericlelist.length);
      }
    });
  }

  getVircleRecords() {
    this.loading.present();
    this.rest.getBasicInfolist().subscribe( response => {this.loading.dismiss();console.log('getVircleRecords');
      if (response.code === 200) {
        this.vericlelist.splice(0, this.vericlelist.length);
        this.vericlelistinfo = response['basicInfoList'];
        for (let i = 0; i < this.vericlelistinfo.length; i++) {
          if ( this.vericlelistinfo[i]['STATUS'] !== 'w') {
            continue;
          }
          const regno = this.vericlelistinfo[i]['VEHICLE']['REGNO'];
          let reservFlag = true;
          let saName = 'SA:' + this.vericlelistinfo[i]['BOOKSA'];
          if ( this.vericlelistinfo[i]['BOOKF'] !== 'Y') {
            reservFlag = false;
            saName = '';

          }
          const checkintime = this.vericlelistinfo[i]['ARRIVALTIME']

          //reformat the data
          const jsonBasicInfo = {
            'regno': regno,
            'reservFlag': reservFlag,
            'checkintime': checkintime,
            'saName': saName,
            'virecle_info': this.vericlelistinfo[i]['VEHICLE'],
            'customer_info': this.vericlelistinfo[i]['CUSTOMER']
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
