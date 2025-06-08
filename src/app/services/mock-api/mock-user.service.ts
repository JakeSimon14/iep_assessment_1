// src/app/services/mock-user.service.ts
import { Injectable } from '@angular/core';

export interface MockUser {
  ssoid: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockUserService {
  private users: MockUser[] = [
    { ssoid: 'admin', password: 'admin' },
    { ssoid: 'admin', password: 'admin123' },
  ];

  getMockUsers(): MockUser[] {
    return this.users;
  }

  getUserBySsoid(ssoid: string): MockUser | undefined {
    return this.users.find(user => user.ssoid === ssoid);
  }
}
