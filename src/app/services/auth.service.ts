import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MockUserService } from './mock-api/mock-user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router,private mockUserService: MockUserService) { }

    login(ssoid: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        const user = this.mockUserService.getUserBySsoid(ssoid);

        if (!user && !password) {
          observer.error(new Error('SSOID and password are required.'));
        } else if (!user) {
          observer.error(new Error('Not a valid user.'));
        } else if (user.password !== password) {
          observer.error(new Error('Incorrect password.'));
        } else {
          observer.next(true);
          observer.complete();
        }
      }, 1000);
    });
  }

  logout(): void{
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
