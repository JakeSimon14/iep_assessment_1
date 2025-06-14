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
        contractname: 'Train 1',
        jobnumber: 'Job T001',
        isSelected: false,
        isCollapsed: false,
        isFavourite: false,
        assignedToUser: true,
        children: [
          {
            id: 2,
            contractname: 'Train Child 1',
            jobnumber: 'Job TC001',
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
        contractname: 'Train 2',
        jobnumber: 'Job T002',
        isSelected: false,
        isCollapsed: false,
        isFavourite: false,
        assignedToUser: false
      },
      {
        id: 4,
        contractname: 'Train 3',
        jobnumber: 'Job T003',
        isSelected: false,
        isCollapsed: false,
        isFavourite: true,
        assignedToUser: false,
        children: [
          {
            id: 5,
            contractname: 'Train Child 3001',
            jobnumber: 'Job TC3001',
            isSelected: false,
            isCollapsed: false,
            isFavourite: false,
            assignedToUser: false,
            children: [
              {
              id: 7,
            contractname: 'Train Child 3002',
            jobnumber: 'Job TC3002',
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
            contractname: 'Train Child 3003',
            jobnumber: 'Job TC3002',
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
