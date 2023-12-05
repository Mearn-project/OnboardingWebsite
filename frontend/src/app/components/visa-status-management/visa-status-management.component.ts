// visa-status-management.component.ts
import { Component, OnInit } from '@angular/core';
import { VisaStatusService } from '../../services/visa-status.service';
import { VisaStatus } from '../../models/visa-status.model';


// interface VisaStatus {
//   employeeId: number;
//   name: string;
//   visaType: string;
//   startDate: Date;
//   endDate: Date;
//   daysRemaining: number;
//   currentStep: string;
// }

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.scss']
})
export class VisaStatusManagementComponent implements OnInit {
  inProgressDataSource: VisaStatus[] = [];
  allDataSource: VisaStatus[] = [];

  constructor(private visaStatusService: VisaStatusService) { }

  ngOnInit(): void {
    this.loadVisaStatuses();
  }

  loadVisaStatuses() {
    // 调用服务获取数据
    this.visaStatusService.getInProgressVisaStatuses().subscribe(data => {
      this.inProgressDataSource = data;
    });
    this.visaStatusService.getAllVisaStatuses().subscribe(data => {
      this.allDataSource = data;
    });
  }

  applyFilter(filterValue: string): void {
    // 过滤逻辑
    this.allDataSource = this.allDataSource.filter(item => item.name.includes(filterValue));
  }

  // 审批、拒绝操作
  approve(employeeId: number, documentId: number) {
    // 调用服务执行审批操作
    this.visaStatusService.approveDocument(employeeId, documentId).subscribe(() => {
      // rerender
    });
  }

  reject(employeeId: number, documentId: number, feedback: string) {
    // 调用服务执行拒绝操作
    this.visaStatusService.rejectDocument(employeeId, documentId, feedback).subscribe(() => {
      // rerender
    });
  }

}
