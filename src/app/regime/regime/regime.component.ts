import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regime',
  templateUrl: './regime.component.html',
  styleUrls: ['./regime.component.scss'],
})
export class RegimeComponent implements OnInit {
  /* Variable que almacena la pestaña mostrada actualmente */
  showMenu: string;

  /* Variable que almacena los platos del atleta */
  dishes: any = [];

  /* Variable que almacena la dieta del atleta */
  regime: any;

  /* Formulario reactivo para la creación del plato */
  createDishForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    //DAYRY, MEAT, FISH, EGG, VEGETABLE, NUT, POTATO, FRUIT, CEREAL
    categories: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {
    /* Pestaña por defecto - Mi dieta */
    // this.showMenu = 'regime';
    this.showMenu = 'dishes';

    console.log(this.dishes);
  }

  /* Método que establece el valor de la pestaña actual */
  changeShowMenu(toChange: string) {
    this.showMenu = toChange;
  }

  /**
   * Funcion que resetea los valores del formulario en el modal de crear plato
   */
  resetCreateDishForm() {
    /* Borrar la lista de platos */
    this.dishes = [];

    /* Resetear el formulario de añadir amigos */
    this.createDishForm.reset();
  }

}
