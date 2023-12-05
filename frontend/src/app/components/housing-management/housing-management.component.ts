import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {
  houses: any[] = []; // 房屋数据

  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    this.loadHouses();
  }

  loadHouses() {
    // 加载房屋数据
  }

  addHouse() {
    // 添加房屋
  }

  viewDetails(houseId: number) {
    // 查看房屋详细信息
  }

  deleteHouse(houseId: number) {
    // 删除房屋
  }
}
