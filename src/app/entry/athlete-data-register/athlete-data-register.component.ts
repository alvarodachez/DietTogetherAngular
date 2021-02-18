import { Component, OnInit } from '@angular/core';
import { AthleteClass } from '../models/athlete.class';

@Component({
  selector: 'app-athlete-data-register',
  templateUrl: './athlete-data-register.component.html',
  styleUrls: ['./athlete-data-register.component.scss']
})
export class AthleteDataRegisterComponent implements OnInit {

  loginAthlete: AthleteClass;

  constructor() {
    this.loginAthlete = new AthleteClass("", "", 0, 0)
  }

  ngOnInit(): void {
  }

  onSubmit(formData: AthleteClass) {
    console.log(formData);

    
  }

}
