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

  /* Variable que almacena las categorías de los platos */
  dishesCategories: any[] = [];

  /* Variable que almacena la lista de categorías seleccionadas */
  selectedCategoriesList: any = [];


  /* Formulario reactivo para la creación del plato */
  createDishForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
  });

  constructor(private regimeService: RegimeService) {}

  ngOnInit(): void {
    /* Pestaña por defecto - Mi dieta */
    // this.showMenu = 'regime';
    this.showMenu = 'dishes';

    this.getDishes();

    this.getDayRegime();

    /* obtener las categorías de los platos */
    this.getCategoriesOfDishes();
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
    // this.dishes = [];

    /* Resetear el formulario de añadir amigos */
    this.createDishForm.reset();
  }

  getDishes() {
    this.regimeService.getDishesByUsername().subscribe((response) => {
      console.log(response);
      this.dishes = response;
    });
  }

  getDayRegime() {
    this.regimeService.getDayRegime().subscribe((response) => {
      console.log(response);
      this.daysRegime = response;
    });
  }

  getCategoriesOfDishes() {
    this.regimeService.getMealCategories().subscribe((response) => {
      console.log(response);
      this.dishesCategories = response;
    });
  }

  createDish() {
    let dish: DishInterface = {
      name: this.createDishForm.value.name,
      description: this.createDishForm.value.description,
      categories: this.selectedCategoriesList
    };
    console.log("...antes de enviar...");

    this.regimeService.createDish(dish).subscribe((response) => {
      /* Se refresca la lista de platos */
      this.getDishes();

      /* Se resetea el formulario */
      this.resetCreateDishForm();

      console.log(response);
      console.log("...enviado...");
    });
  }

  /* Método que gestiona el checkbox de categorías */
  onCheckboxChange(e) {
    if (e.target.checked) {
      /* Añadir categoría a la lista de categorías seleccionadas */
      this.selectedCategoriesList.push(e.target.id);
    } else {
      /* Eliminar categoría de la lista de categorías seleccionadas */
      this.selectedCategoriesList.splice(
        this.selectedCategoriesList.indexOf(e.target.id),1
      );
    }
  }
}
