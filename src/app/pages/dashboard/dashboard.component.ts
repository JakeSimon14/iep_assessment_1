import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { BreadcrumbSelectionService } from '../../services/breadcrumb-selection.service';
import { GridDataItem, MockDashboardService } from '../../services/mock-api/mock-dashboard.service';


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
export class DashboardComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  filterActivityForm: FormGroup;


  isFilterActivityExpandedView = false;
  isExpandedView = false;
  hasReassignRequests = true;
  activeTab = 'ISPO';

  
  chipItems: string[] = [
    'Total Documents (1321)',
    'Backlogs (16)',
    'Forecast (199)',
    'Not Acknowledged (3)',
    'Step (5)',
    'Rulestream (3)'
  ];
  selectedChip: string = 'Total Documents (1321)';
  selectedBreadcrumb: string[] = [];

  tabButtons = [
    { label: 'ISPO', value: 'ISPO' },
    { label: 'VDR', value: 'VDR' },
    { label: 'VDR Revision', value: 'VDR_Revision' },
    { label: 'VDR Finalization', value: 'VDR_Finalization' },
    { label: 'OTD Trends', value: 'OTD_Trends' },
    { label: 'Engineering Productivity', value: 'Engineering_Productivity' },
    { label: 'Technical Alignment', value: 'Technical_Alignment' }
  ];

  viewAsOptions = ['Individual', 'Team'];
  functionOptions = ['ENG', 'TECH'];
  documentTypeOptions = ['Internal', 'Step'];
  statusOptions = ['Not Completed', 'Completed'];
  activityTypeOptions = ['560', '510', '505'];
  finishByOptions = ['Late Finish', 'Early Finish'];
  dateTypeOptions = ['Business', 'Calendar'];


  gridData: GridDataItem[] = [];
  originalGridData: GridDataItem[] = [];


  private dashboardService = inject(MockDashboardService);
  private breadcrumbService = inject(BreadcrumbSelectionService);
  private subBreadcrumb = new Subscription();

  @ViewChild('weekSlider', { static: true }) weekSlider!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private selectionService: BreadcrumbSelectionService,
    private gridMockService: MockDashboardService
  ) {
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

    this.searchForm.get('search')!.valueChanges.subscribe((term: string) => {
      this.applySearch(term);
    });

    this.subBreadcrumb.add(
      this.selectionService.getSelection$('breadcrumb').subscribe(selection => {
        debugger;
        this.selectedBreadcrumb = selection.labels;
        this.fetchGridData(selection.jobnumbers);
      })
    );
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
    const scrollAmount = 200;
    const container = this.weekSlider.nativeElement;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  fetchGridData(jobnumbers: string[]): void {
    this.gridMockService.getFilteredData(jobnumbers).subscribe(data => {
      debugger;
      this.gridData = data;
      this.originalGridData = data;
    });
  }

  applySearch(term: string): void {
    const lowerTerm = term.toLowerCase();

    this.gridData = this.originalGridData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowerTerm)
      )
    );
  }

  ngOnDestroy(): void {
    this.subBreadcrumb.unsubscribe();
  }
}