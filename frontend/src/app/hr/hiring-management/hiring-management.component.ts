import { Component, OnInit } from '@angular/core';
import { HiringService } from '../../services/hiring.service';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent implements OnInit {
  tokens: any[] = [];
  applications: any[] = [];

  constructor(private hiringService: HiringService) {}

  ngOnInit(): void {
    this.loadApplications();
    this.loadTokenHistory();
  }

  generateToken() {
    // 生成令牌并发送邮件
  }

  loadApplications() {
    // 加载申请
  }

  loadTokenHistory() {
    // 加载令牌历史
  }

  viewApplication(id: number) {
    // 查看申请
  }

  approveApplication(id: number) {
    // 批准申请
  }

  rejectApplication(id: number) {
    // 拒绝申请
  }
}
