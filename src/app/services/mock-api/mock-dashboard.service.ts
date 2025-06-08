import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface GridDataItem {
  jobnumber: string;
  contractname: string;
  status: string;
  startDate: string;
}

@Injectable({ providedIn: 'root' })
export class MockDashboardService {

  private allData: GridDataItem[] = [
    { jobnumber: 'Job T001', contractname: 'Train 1', status: 'Active', startDate: '2025-01-10' },
    { jobnumber: 'Job TC001', contractname: 'Train Child 1', status: 'Pending', startDate: '2025-02-15' },
    { jobnumber: 'Job T002', contractname: 'Train 2', status: 'Completed', startDate: '2025-03-20' },
    { jobnumber: 'Job T003', contractname: 'Train 3', status: 'Active', startDate: '2025-04-25' },
    { jobnumber: 'Job TC3001', contractname: 'Train Child 3001', status: 'Pending', startDate: '2025-02-15' },
    { jobnumber: 'Job TC3002', contractname: 'Train Child 3002', status: 'Completed', startDate: '2025-03-20' },
    { jobnumber: 'Job TC3002', contractname: 'Train Child 3003', status: 'Active', startDate: '2025-04-25' }
  ];

  getFilteredData(selectedJobNumbers: string[]): Observable<GridDataItem[]> {
    debugger;
    if (!selectedJobNumbers?.length) {
      return of([]); 
    }

    const filtered = this.allData.filter(item => selectedJobNumbers.includes(item.jobnumber));
    return of(filtered);
  }
}
