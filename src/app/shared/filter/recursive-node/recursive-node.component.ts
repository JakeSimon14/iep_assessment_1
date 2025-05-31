import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem } from '../../../models/filter-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recursive-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recursive-node.component.html',
  styleUrl: './recursive-node.component.scss'
})
export class RecursiveNodeComponent {

  @Input() item!: FilterItem;
  @Input() hasParent = false;
  @Output() toggleCollapse = new EventEmitter<FilterItem>();
  @Output() toggleSelect = new EventEmitter<{ item: FilterItem, selected: boolean }>();

  onCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggleSelect.emit({ item: this.item, selected: isChecked });
  }

  onToggleCollapse() {
    this.toggleCollapse.emit(this.item);
  }
  
  toggleFavourite(item: FilterItem) {
  item.isFavourite = !item.isFavourite;
}
}
