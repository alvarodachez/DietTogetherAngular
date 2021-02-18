import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthleteDtoClass } from '../models/athlete-dto';
import { AthleteClass } from '../models/athlete.class';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-athlete-data-register',
  templateUrl: './athlete-data-register.component.html',
  styleUrls: ['./athlete-data-register.component.scss']
})
export class AthleteDataRegisterComponent implements OnInit {

  loginAthlete: AthleteClass;
  loginAthleteDto: AthleteDtoClass;

  constructor(private signUpService: SignUpService, private route: Router) {
    this.loginAthlete = new AthleteClass("", "", "", "", "", "")
    this.loginAthleteDto = new AthleteDtoClass("", "", 0, 0)
  }

  ngOnInit(): void {
  }

  onSubmit(formData: AthleteClass) {
    console.log(formData);

    this.loginAthleteDto.name = formData.name;
    this.loginAthleteDto.surname = formData.surname;
    this.loginAthleteDto.weight = parseFloat(formData.weightKilograms + "." + formData.weightGrams);
    this.loginAthleteDto.height = parseFloat(formData.heightMeters + "." + formData.heightCentimeters);
    this.loginAthleteDto.birthDay = formData.birthDay;

    console.log(this.loginAthleteDto);

    this.signUpService.athleteDataSign(this.loginAthleteDto).subscribe(response => {
      console.log(response);
      this.route.navigate(['login']);
    })

  }

}