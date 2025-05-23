import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterItem } from '../../models/filter-item.model';
import { RecursiveTreeComponent } from "../../shared/filter/recursive-tree/recursive-tree.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ToolBarModule, CommonModule, ReactiveFormsModule, RecursiveTreeComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  tabs = ['My Contracts', 'All Contracts', 'Favourites'];
  activeTabIndex = 0;
  searchControl = new FormControl('');
  selectedItems: FilterItem[] = [];

  filterItems: FilterItem[] = [
      {
        id: 1,
        contractname: 'Parent 1',
        jobnumber: '001',
        isSelected: false,
        isCollapsed: false,
        children: [
          {
            id: 2,
            contractname: 'Child 1.1',
            jobnumber: '001-1',
            isSelected: false,
            isCollapsed: false,
            children: []
          }
        ]
      },
      {
        id: 3,
        contractname: 'Parent 2',
        jobnumber: '002',
        isSelected: false,
        isCollapsed: false
      }
    ];

  selectTab(index: number): void {
    this.activeTabIndex = index;
  }
ngOnInit() {
  console.log('Filter Items:', this.filterItems);
}

onItemSelect(event: { item: FilterItem; selected: boolean }) {
  if (event.selected) {
    this.selectedItems.push(event.item);
  } else {
    this.selectedItems = this.selectedItems.filter(i => i.id !== event.item.id);
  }
}
  
}
