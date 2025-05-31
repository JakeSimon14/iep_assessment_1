import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ConstOtrDashboardMenu, OtrMenuItem } from '../../models/menu-config.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SidebarMenuComponent {
  
@Output() selectionChange = new EventEmitter<string>();
  menuItems: OtrMenuItem[] = ConstOtrDashboardMenu;
  selectedId = this.menuItems[0].id;

  constructor(private router: Router) {}

  select(item: OtrMenuItem): void {
    this.selectedId = item.id;
    this.selectionChange.emit(item.route);
    this.router.navigate([item.route]);
  }
}
