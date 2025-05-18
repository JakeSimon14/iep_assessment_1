import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

   login(ssoid:string,password:string):boolean{
    debugger;
    if(ssoid.trim() && password.trim())
    {
      localStorage.setItem('isLoggedIn','true');
      debugger;
      const user = { name: ssoid };
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
       return false;
  }

  logout(): void{
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
