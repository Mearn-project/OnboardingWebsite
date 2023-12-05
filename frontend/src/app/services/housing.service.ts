import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  getHouses() {
    // 获取房屋数据
  }

  addNewHouse(houseData: any) {
    // 添加新房屋
  }

  deleteHouse(houseId: number) {
    // 删除房屋
  }

}
