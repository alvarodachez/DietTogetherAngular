import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DayRegimeInterface } from '../models/dayRegime.interface';
import { DishInterface } from '../models/dish.interface';
import { MealRegimeInterface } from '../models/mealRegimeInterface';
import { RegimeService } from '../services/regime.service';

@Component({
  selector: 'app-regime',
  templateUrl: './regime.component.html',
  styleUrls: ['./regime.component.scss'],
})
export class RegimeComponent implements OnInit {
  /* Variable que almacena la pestaña mostrada actualmente */
  showMenu: string;

  /* Variable que almacena los platos del atleta */
  dishes: DishInterface[] = [];

  /* Variable que almacena la dieta del atleta */
  daysRegime: DayRegimeInterface[] = [];

  /* Formulario reactivo para la creación del plato */
  createDishForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    //DAYRY, MEAT, FISH, EGG, VEGETABLE, NUT, POTATO, FRUIT, CEREAL
    //categories: new FormControl('', Validators.required),
  });

  constructor(private regimeService: RegimeService) {}

  ngOnInit(): void {
    /* Pestaña por defecto - Mi dieta */
    // this.showMenu = 'regime';
    this.showMenu = 'dishes';

    this.getDishes();

    this.getDayRegime();

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

  getDishes() {

    this.regimeService.getDishesByUsername().subscribe(response => {
      console.log(response);
      this.dishes = response;
    })
  }

  getDayRegime(){
    this.regimeService.getDayRegime().subscribe(response => {
      console.log(response);
      this.daysRegime = response;
    })
  }

  createDish(){

    let dish:DishInterface = {
      name:this.createDishForm.value.name,
      description:this.createDishForm.value.description
      
    }

    this.regimeService.createDish(dish).subscribe(response => {
      console.log(response);
    })
  }
}
