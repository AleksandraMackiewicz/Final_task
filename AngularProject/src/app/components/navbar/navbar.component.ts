import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  // Inject the MatDialog service in the constructor
  constructor(private router: Router) {}

  onClickedLogout() {
    /*const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to log out?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        // Perform the logout action
      }
    });*/

      
    if(confirm("Are you sure to log out?")) {
     sessionStorage.clear();
     this.navigateToLogin();
    }
  }
  navigateToLogin() {
    this.router.navigate(['/log-in']);
  }
  getLogIn() {
    let x = sessionStorage.getItem("login");
    if(x == undefined){
      return "";
    }
    return x;
  }
  // Your authentication logic would go here, and you would update the value of isLoggedIn accordingly
  isLoggedIn() {
    let x = sessionStorage.getItem("login");
    if(x == undefined)
    {
    //  console.log("NavbarComponent - not logged");
      return false;
    }
    if(x.length==0)
    {
   //   console.log("NavbarComponent - not logged");
      return false;
    }
   // console.log("NavbarComponent - logged");
    return true;
  }

}
