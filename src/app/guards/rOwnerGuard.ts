// import { CanActivate } from "@angular/router";

// export class RownerGuard implements CanActivate {
//   role: any;

//   constructor() {
//     this.role = localStorage.getItem('role');
//   }

//   canActivate() {
//     if (this.role === "Restaurant_owner") {
//       return true;
//     }
//     alert("Sorry... No access");
//     return false;
//   }
// }

import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RownerGuard implements CanActivate {
  role: any;

  constructor(private router: Router) {
    this.role = localStorage.getItem('role');
  }

  canActivate() {
    if (this.role === "Restaurant_owner") {
      return true;
    } else {
      alert("Sorry... No access");
      this.router.navigate(['/']);
      return false;
    }
  }
}


