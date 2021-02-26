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

  constructor(private route: Router, private login: LogInService) { }

  ngOnInit(): void {

    if ((localStorage.getItem("dietUsernameSession") && (localStorage.getItem("dietUsernameSession") != "" && localStorage.getItem("dietUsernameSession") != undefined))) {
      this.online = true;
    }
  }

  checkSessionStatus() {
    const username = localStorage.getItem("dietUsernameSession");

    if (username && (username != "" && username != undefined)) {
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
