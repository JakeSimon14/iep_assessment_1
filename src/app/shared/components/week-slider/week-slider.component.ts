import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WeekTile } from '../../../models/week-tile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-slider.component.html',
  styleUrl: './week-slider.component.scss'
})
export class WeekSliderComponent {
 @Input() tiles: WeekTile[] = [];

  @ViewChild('weekSlider', { static: true }) weekSlider!: ElementRef;

  scroll(direction: 'left' | 'right'): void {
    const scrollAmount = 200;
    const container = this.weekSlider.nativeElement;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  getCardClass(tile: WeekTile): string {
    if (tile.type === 'today') return 'week-tile today';
    if (tile.type === 'this-week') return 'week-tile this-week';
    return 'week-tile';
  }
}