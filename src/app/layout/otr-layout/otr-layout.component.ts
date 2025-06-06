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
import { Observable, of } from 'rxjs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';

@Component({
  selector: 'app-otr-layout',
  standalone: true,
  imports: [ToolBarModule, CommonModule, ReactiveFormsModule, RecursiveTreeComponent, HeaderComponent, SidebarMenuComponent, DashboardComponent,RouterModule,TreeViewModule],
  templateUrl: './otr-layout.component.html',
  styleUrl: './otr-layout.component.scss'
})
export class OtrLayoutComponent {
 // ────── Public Properties ──────
     collapsed: boolean = false;

  tabs = ['My Contracts', 'All Contracts', 'Favourites'];
  activeTabIndex = 0;

  searchControl = new FormControl('');
  filterForm: FormGroup;

  filterItems: FilterItem[] = [];
  originalItems: FilterItem[] = [];
  checkedKeys: string[] = [];
  expandedKeys: any[] = [];
  router: any;

  // ────── Constructor ──────
  constructor(
    private contractService: MockContractService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectAll: [false]
    });
  }

  // ────── Lifecycle ──────
  ngOnInit() {
    this.fetchFilterItems();
    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  // ────── UI Events ──────


toggleCollapse() {
  this.collapsed = !this.collapsed;
}

  selectTab(index: number): void {
    this.activeTabIndex = index;
    this.applyFilters();
  }

  toggleFavourite(item: FilterItem): void {
    item.isFavourite = !item.isFavourite;
  }

  // ────── Tree View Events ──────
onCheckedKeysChange(checked: string[]): void {
  this.checkedKeys = checked;
  const allKeys = this.getAllKeys(this.filterItems);
  const isAll = checked.length === allKeys.length;
  this.filterForm.get('selectAll')?.setValue(isAll, { emitEvent: false });
}

  // ────── Form Actions ──────
selectAll(checked: boolean): void {
  if (checked) {
    setTimeout(() => {
      const allKeys = this.getAllKeys(this.filterItems);  // <<< not filterItems!
      this.checkedKeys = [...allKeys];
      this.filterForm.get('selectAll')?.setValue(true, { emitEvent: false });
    });
  } else {
    this.checkedKeys = [];
    this.filterForm.get('selectAll')?.setValue(false, { emitEvent: false });
  }
}

  isAllSelected(): boolean {
    const allKeys = this.getAllKeys(this.filterItems);
    return allKeys.length > 0 && this.checkedKeys.length === allKeys.length;
  }
  

  // ────── Data Load / Filters ──────
  fetchFilterItems(): void {
    this.contractService.getContracts().subscribe(data => {
      this.originalItems = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
  const search = this.searchControl.value?.toLowerCase() || '';

const matchesTabCondition = (item: FilterItem): boolean => {
  switch (this.activeTabIndex) {
    case 0: return !!item.assignedToUser;
    case 1: return true;
    case 2: return !!item.isFavourite;
    default: return true;
  }
};

  const matchesSearch = (item: FilterItem): boolean => {
    return item.contractname.toLowerCase().includes(search) ||
           item.jobnumber.toLowerCase().includes(search);
  };

  const filterRecursive = (items: FilterItem[]): FilterItem[] => {
    return items
      .map(item => {
        const children = filterRecursive(item.children || []);
        const include = matchesTabCondition(item);
        const match = include && matchesSearch(item);

        if (match || children.length) {
          return {
            ...item,
            children
          };
        }
        return null;
      })
      .filter(item => item !== null) as FilterItem[];
  };

  this.filterItems = filterRecursive(this.originalItems);

  // Update Select All checkbox
  const allKeys = this.getAllKeys(this.filterItems);
  this.checkedKeys = this.checkedKeys.filter(k => allKeys.includes(k));
  this.filterForm.get('selectAll')?.setValue(this.isAllSelected(), { emitEvent: false });
}

  // ────── Tree View Helpers ──────
  fetchChildren = (item: object): Observable<object[]> => {
    return of((item as FilterItem).children || []);
  };

  hasChildren = (item: object): boolean => {
    return !!(item as FilterItem).children?.length;
  };

  hasParent(item: FilterItem): boolean {
    return this.originalItems.some(parent => parent.children?.includes(item));
  }

  getAllKeys(items: FilterItem[]): string[] {
  const keys: string[] = [];

  const collectKeys = (items: FilterItem[]) => {
    for (const item of items) {
      if (item.jobnumber) {
        keys.push(item.jobnumber);
      }
      if (item.children?.length) {
        collectKeys(item.children);
      }
    }
  };

  collectKeys(items);
  return keys;
}



    onMenuChange(route: string): void {
    debugger;
  this.router.navigate([route]); 
}
}