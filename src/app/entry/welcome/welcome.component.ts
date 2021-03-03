import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }


  irLogin(){
    let contenedor = document.getElementById('contenedor-welcome');

    //contenedor.className = 'animate__animated animate__backOutLeft';

    this.route.navigate(['/login']);
  }

}
