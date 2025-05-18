import { Component } from '@angular/core';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ToolBarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
