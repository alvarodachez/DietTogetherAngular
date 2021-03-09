import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogInService } from 'src/app/entry/services/log-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  online: boolean = false;

  admin: boolean = false;

  constructor(private route: Router, private login: LogInService) { }

  ngOnInit(): void {


    this.online = this.login.isLoggedIn('');
    this.admin = this.login.isAdmin('');

    this.login.changeLoginStatus$.subscribe((loggedStatus: boolean) => {
      this.online = loggedStatus;
    })

    this.login.changeAdminStatus$.subscribe((adminStatus:boolean) => {
      this.admin = adminStatus;
    })

    /* if ((localStorage.getItem("dietUsernameSession") && (localStorage.getItem("dietUsernameSession") != "" && localStorage.getItem("dietUsernameSession") != undefined))) {
      this.online = true;
    } */
  }

  checkSessionStatus() {
    const username = localStorage.getItem("dietUsernameSession");

    if (this.online == true) {
      // alert("home");
      this.route.navigate(["home"])
    } else {
      // alert("welcome");
      this.route.navigate(["welcome"])
    }
  }

  logout() {
    // borrar localStorage dietUsernameSession
    this.login.logout();

    // redirigir a welcome

  }

}
