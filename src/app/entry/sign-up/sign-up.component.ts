import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignUpDto } from '../models/signup-user-dto';
import { SignUpClass } from '../models/singup.class';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  singUpClass: SignUpClass;

  userSignUpDto: UserSignUpDto;

  constructor(private signUpService: SignUpService, private route: Router) {

    this.singUpClass = new SignUpClass("", "", "");
    this.userSignUpDto = new UserSignUpDto("","");
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {

    console.log(formData);
    this.userSignUpDto.username = formData.username;
    this.userSignUpDto.password = formData.password;

    this.signUpService.userSignUp(this.userSignUpDto).subscribe((response)=>{

      console.log(response);

      localStorage.setItem('dietUsername',response.username);

      this.route.navigate(['athlete']);
    });


  }

}
