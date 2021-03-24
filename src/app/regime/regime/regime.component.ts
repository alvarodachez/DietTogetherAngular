import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regime',
  templateUrl: './regime.component.html',
  styleUrls: ['./regime.component.scss'],
})
export class RegimeComponent implements OnInit {
  
  /* Variable que almacena la pestaña mostrada actualmente */
  showMenu: string;

  constructor() {}

  ngOnInit(): void {
    /* Pestaña por defecto - Mi dieta */
    this.showMenu = 'regime';
  }

  /* Método que establece el valor de la pestaña actual */
  changeShowMenu(toChange:string){
    this.showMenu = toChange;
  }

}
