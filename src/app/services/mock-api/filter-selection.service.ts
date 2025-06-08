import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterSelectionService {
  private selectedJobNumbers$ = new BehaviorSubject<string[]>([]);

  setSelectedJobNumbers(jobNumbers: string[]) {
    this.selectedJobNumbers$.next(jobNumbers);
  }

  getSelectedJobNumbers() {
    return this.selectedJobNumbers$.asObservable();
  }
}
