import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BreadcrumbSelection {
  labels: string[];
  jobnumbers: string[];
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbSelectionService {
  private selectionMap = new Map<string, BehaviorSubject<BreadcrumbSelection>>();

  getSelection$(key: string): Observable<BreadcrumbSelection> {
    if (!this.selectionMap.has(key)) {
      this.selectionMap.set(
        key,
        new BehaviorSubject<BreadcrumbSelection>({ labels: [], jobnumbers: [] })
      );
    }
    return this.selectionMap.get(key)!.asObservable();
  }

  updateSelection(key: string, labels: string[], jobnumbers: string[]): void {
    if (!this.selectionMap.has(key)) {
      this.selectionMap.set(
        key,
        new BehaviorSubject<BreadcrumbSelection>({ labels, jobnumbers })
      );
    } else {
      this.selectionMap.get(key)!.next({ labels, jobnumbers });
    }
  }

  clearSelection(key: string): void {
    this.selectionMap.get(key)?.next({ labels: [], jobnumbers: [] });
  }

  getCurrentSelection(key: string): BreadcrumbSelection {
    return this.selectionMap.get(key)?.value ?? { labels: [], jobnumbers: [] };
  }
}
