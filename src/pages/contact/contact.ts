import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  metadataList: any;
  tips: string;
  sourceText: string = "";
  sourceList: string[] = [];

  constructor(public navCtrl: NavController, public http: Http) {

  }

  ngOnInit() {
    this.getMetaData();
  }

  getMetaData() {
    this.http.get('http://192.168.2.111:8080/lisi/app/getMetaData/1').toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          this.metadataList = result.data;
        } else {
          this.tips = "无法获取元数据：" + result.tip;
        }
      })
      .catch(this.loginHandleError);
  }

  writeSource() {
    this.sourceText = "";
    this.metadataList.forEach(element => {
      if (null == element.value) {
        element.value = "null";
      }
      this.sourceText = this.sourceText + element.value + "|";
    });
    this.sourceList.push(this.sourceText);
  }

  private loginHandleError(error: any): Promise<any> {
    this.tips = "无法获取元数据：，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
