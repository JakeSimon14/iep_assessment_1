import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ChipModule } from '@progress/kendo-angular-buttons';
import { CardModule } from '@progress/kendo-angular-layout';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@progress/kendo-angular-icons';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TabStripModule,
    ReactiveFormsModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    LayoutModule,
    IndicatorsModule,
    ChipModule,
    CardModule,
    IconsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  filterActivityForm: FormGroup;
isFilterActivityExpandedView =false;
  isExpandedView = false;
  hasReassignRequests = true;
chipItems: string[] = [
  'Total Documents (1321)',
  'Backlogs (16)',
  'Forecast (199)',
  'Not Acknowledged (3)',
  'Step (5)',
  'Rulestream (3)'
];

selectedChip: string = 'Total Documents (1321)';


viewAsOptions = ['Individual', 'Team'];
  functionOptions = ['ENG', 'TECH'];
  documentTypeOptions = ['Internal', 'Step'];
  statusOptions = ['Not Completed', 'Completed'];
  activityTypeOptions = ['560', '510', '505']; // ✅ MUST be here
  finishByOptions = ['Late Finish', 'Early Finish'];
  dateTypeOptions = ['Business', 'Calendar'];
  

  activityData = [
    {
      projectId: '(406) 555-0120',
      activityId: '(406) 555-0120',
      activityName: '6391 Elgin St. Celina, Delaware 1029...',
      primaryResource: 'Amanda Johnson',
      earlyDate: new Date(2024, 9, 14)
    },
    {
      projectId: '(239) 555-0108',
      activityId: '(239) 555-0108',
      activityName: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      primaryResource: 'Robert Fox',
      earlyDate: new Date(2024, 9, 14)
    },
    {
      projectId: '(406) 555-0120',
      activityId: '(480) 555-0103',
      activityName: '4140 Parker Rd. Allentown, New Mexico 31134',
      primaryResource: 'Savannah Nguyen',
      earlyDate: new Date(2024, 9, 14)
    }
  ];


  @ViewChild('weekSlider', { static: true }) weekSlider!: ElementRef;
  
  get filteredActivityData() {
    return this.activityData;
  }

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.filterActivityForm = this.fb.group({
  viewAs: [''],
  function: [''],
  docTypes: [[]],
  status: [''],
  activityType: [[]],
  finishBy: [''],
  dateType: ['']
});
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(search => {
      console.log('Search changed:', search.search);
    });

    this.filterActivityForm.valueChanges.subscribe(filters => {
      console.log('Filter values changed:', filters);
    });
  }


  toggleExpandView(): void {
  this.isExpandedView = !this.isExpandedView;
}

toggleFilterActivityExpandView(): void {
  this.isFilterActivityExpandedView = !this.isFilterActivityExpandedView;
}

clearFilters(): void {
  this.filterActivityForm.reset({
    viewAs: '',
    function: '',
    docTypes: [],
    status: ''
  });
}

selectChip(chip: string): void {
  this.selectedChip = chip;
}

scrollWeekSlider(direction: 'left' | 'right'): void {
  const scrollAmount = 200; // Adjust if needed
  const container = this.weekSlider.nativeElement;

  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
}
