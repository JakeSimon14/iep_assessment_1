import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem } from '../../../models/filter-item.model';
import { RecursiveNodeComponent } from "../recursive-node/recursive-node.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recursive-tree',
  standalone: true,
  imports: [RecursiveNodeComponent,CommonModule],
  templateUrl: './recursive-tree.component.html',
  styleUrl: './recursive-tree.component.scss'
})
export class RecursiveTreeComponent {

  @Input() items: FilterItem[] = [];
@Output() itemSelected = new EventEmitter<{ item: FilterItem; selected: boolean }>();

  ngOnInit(): void {}

  toggleCollapse(item: FilterItem) {
    item.isCollapsed = !item.isCollapsed;
  }


toggleSelect(event: { item: FilterItem; selected: boolean }) {
  this.itemSelected.emit(event);
  this.setSelectionRecursive(event.item, event.selected);
}

  private setSelectionRecursive(item: FilterItem, selected: boolean) {
    item.isSelected = selected;
    if (item.children?.length) {
      item.children.forEach(child => this.setSelectionRecursive(child, selected));
    }
  }

  selectAll(checked: boolean) {
    this.items.forEach(item => this.setSelectionRecursive(item, checked));
  }

  isAllSelected(): boolean {
    return this.items.every(item => this.checkAllSelected(item));
  }

  private checkAllSelected(item: FilterItem): boolean {
    if (!item.isSelected) return false;
    if (item.children?.length) {
      return item.children.every(child => this.checkAllSelected(child));
    }
    return true;
  }
  
}
