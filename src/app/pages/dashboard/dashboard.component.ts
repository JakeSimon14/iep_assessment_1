import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { KENDO_DROPDOWNS } from "@progress/kendo-angular-dropdowns";
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IndicatorsModule } from '@progress/kendo-angular-indicators'; // for kendo-alert
import { ChipModule } from '@progress/kendo-angular-buttons'; // ChipList uses ButtonsModule
import { CardModule } from '@progress/kendo-angular-layout';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,TabStripModule,ReactiveFormsModule,GridModule,ButtonsModule,InputsModule,DropDownsModule,LayoutModule,
        IndicatorsModule,ChipModule,CardModule   
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
 filterForm!: FormGroup;
  hasReassignRequests = true;

  activityData = [
    {
      projectId: '1104096',
      activityId: 'ACT001',
      activityName: 'FEED Review',
      primaryResource: 'John Doe',
      earlyDate: new Date(2025, 1, 4)
    },
    {
      projectId: '1104088',
      activityId: 'ACT002',
      activityName: 'Design Freeze',
      primaryResource: 'Jane Smith',
      earlyDate: new Date(2025, 1, 7)
    },
    {
      projectId: '9000133',
      activityId: 'ACT003',
      activityName: 'Vendor Review',
      primaryResource: 'Rahul Kumar',
      earlyDate: new Date(2025, 1, 10)
    }
  ];


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      selectedView: [''],
      selectedFunction: [''],
      selectedDocTypes: [[]],
      selectedStatus: [''],
      selectedActivityTypes: [[]],
      selectedFinishBy: [''],
      selectedDateType: ['']
    });
  }

 selectedTabIndex: number = 0; 



onClear(): void {
    this.filterForm.reset({
      selectedView: '',
      selectedFunction: '',
      selectedDocTypes: [],
      selectedStatus: '',
      selectedActivityTypes: [],
      selectedFinishBy: '',
      selectedDateType: ''
    });
  }
}
