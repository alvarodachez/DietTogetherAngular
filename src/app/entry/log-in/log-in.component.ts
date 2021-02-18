import { Component, OnInit } from '@angular/core';
import { LoginClass } from '../models/login.class';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginUser: LoginClass;

  constructor() {
    this.loginUser = new LoginClass("", "");
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    console.log(formData);
    // alert("hola");
  }

}
