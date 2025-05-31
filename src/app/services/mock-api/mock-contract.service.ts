import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FilterItem } from '../../models/filter-item.model';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockContractService {

  constructor() { }

   private mockData: FilterItem[] = [
    {
        id: 1,
        contractname: 'Parent 1',
        jobnumber: '001',
        isSelected: false,
        isCollapsed: false,
        isFavourite: false,
        assignedToUser: true,
        children: [
          {
            id: 2,
            contractname: 'Child 1.1',
            jobnumber: '001-1',
            isSelected: false,
            isCollapsed: false,
            isFavourite: false,
            assignedToUser: true,
            children: []
          }
        ]
      },
      {
        id: 3,
        contractname: 'Parent 2',
        jobnumber: '002',
        isSelected: false,
        isCollapsed: false,
        isFavourite: false,
        assignedToUser: false
      },
      {
        id: 4,
        contractname: 'Parent 3',
        jobnumber: '003',
        isSelected: false,
        isCollapsed: false,
        isFavourite: true,
        assignedToUser: false,
        children: [
          {
            id: 5,
            contractname: 'Child 3.1',
            jobnumber: '003-1',
            isSelected: false,
            isCollapsed: false,
            isFavourite: false,
            assignedToUser: false,
            children: [
              {
              id: 7,
            contractname: 'Sub Child 3.1',
            jobnumber: '003-sub-1',
            isSelected: false,
            isCollapsed: false,
            isFavourite: false,
            assignedToUser: false,
            children: []
              }
            ]
          },
          {
            id: 6,
            contractname: 'Child 3.2',
            jobnumber: '003-2',
            isSelected: false,
            isCollapsed: false,
            isFavourite: false,
            assignedToUser: false,
            children: []
          }
        ]
      }
   ];

  getContracts(): Observable<FilterItem[]> {
    return of(this.mockData).pipe(delay(300));
  }
}
