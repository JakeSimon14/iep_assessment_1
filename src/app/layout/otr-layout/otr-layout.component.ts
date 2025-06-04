import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterItem } from '../../models/filter-item.model';
import { RecursiveTreeComponent } from "../../shared/filter/recursive-tree/recursive-tree.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { SidebarMenuComponent } from "../../shared/sidebar-menu/sidebar-menu.component";
import { MockContractService } from '../../services/mock-api/mock-contract.service';
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-otr-layout',
  standalone: true,
  imports: [ToolBarModule, CommonModule, ReactiveFormsModule, RecursiveTreeComponent, HeaderComponent, SidebarMenuComponent, DashboardComponent,RouterModule],
  templateUrl: './otr-layout.component.html',
  styleUrl: './otr-layout.component.scss'
})
export class OtrLayoutComponent {

  constructor(private contractService: MockContractService) {}
  
tabs = ['My Contracts', 'All Contracts', 'Favourites'];
activeTabIndex = 0;
searchControl = new FormControl('');
filterItems: FilterItem[] = [];
originalItems: FilterItem[] = [];
  selectedItems: FilterItem[] = [];

  
  router: any;

  fetchFilterItems() {
  this.contractService.getContracts().subscribe(data => {
    this.originalItems = data;
    this.applyFilters();
  });
}

applyFilters() {
  const search = this.searchControl.value?.toLowerCase() || '';

  switch(this.activeTabIndex) {
    case 0:
      this.filterItems = this.originalItems.filter(item => item.assignedToUser);
      break;

    case 1:
      this.filterItems = this.originalItems.slice();
      break;

    case 2:
      this.filterItems = this.originalItems.filter(item => item.isFavourite);
      break;
  }

  this.filterItems = this.filterItems.filter(item =>
    item.contractname.toLowerCase().includes(search) ||
    item.jobnumber.toLowerCase().includes(search)
  );
}

  selectTab(index: number): void {
    this.activeTabIndex = index;
    this.applyFilters(); 
  }

  onMenuChange(route: string): void {
    debugger;
  this.router.navigate([route]); 
}

ngOnInit() {

  this.fetchFilterItems();

  this.searchControl.valueChanges.subscribe(() => {
    this.applyFilters();
  });
}

onItemSelect(event: { item: FilterItem; selected: boolean }) {
  if (event.selected) {
    this.selectedItems.push(event.item);
  } else {
    this.selectedItems = this.selectedItems.filter(i => i.id !== event.item.id);
  }
}
  
}
