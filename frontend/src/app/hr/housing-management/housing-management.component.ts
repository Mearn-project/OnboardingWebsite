import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { House } from '../../models/house.model';
import { addHouse, deleteHouse, loadHouses, addCommentToReport } from '../../store/housing.actions';
// import { State } from '../../store/housing.reducer';
import { AppState } from '../../store/app.state';
import { MatDialog } from '@angular/material/dialog';
import { HouseSummaryModalComponent } from '../house-summary-modal/house-summary-modal.component';
import { AddHouseModalComponent } from '../add-house-modal/add-house-modal.component';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {
  houses$: Observable<House[]> | undefined;
  selectedHouse: House | null = null;
  private subscription: Subscription = new Subscription();


  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    console.log('Component initialized, dispatching loadHouses action');
    this.store.dispatch(loadHouses());
    this.houses$ = this.store.select((state: AppState) => state.houses.houses);
    const housesSubscription = this.houses$.subscribe(houses => {
      console.log('Houses state:', houses);
    });
    this.subscription.add(housesSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // openHouseSummary(house: House): void {
  //   this.selectedHouse = house;
  // }

  openHouseSummary(house: House): void {
    this.dialog.open(HouseSummaryModalComponent, {
      width: '500px',  // Adjust size as needed
      data: { house: house }
    });
  }

  openAddHouseModal(): void {
    const dialogRef = this.dialog.open(AddHouseModalComponent, {
      width: '500px' // Adjust size as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAddHouse(result);
      }
    });
  }

  onAddHouse(house: any): void {
    this.store.dispatch(addHouse({ house }));
  }

  onDeleteHouse(houseId: string): void {
    this.store.dispatch(deleteHouse({ id: houseId }));
    setTimeout(() => {
      this.store.dispatch(loadHouses());
    }, 500);
  }

  onAddCommentToReport(reportId: string, comment: string): void {
    this.store.dispatch(addCommentToReport({
      facilityReportId: reportId,
      comment: comment
    }));
  }
}
