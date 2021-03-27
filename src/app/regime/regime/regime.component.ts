import { splitAtPeriod } from '@angular/compiler/src/util';
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
    this.showMenu = 'regime';

    /* obtener los platos del atleta */
    this.getDishes();

    /* obtener los días (dieta) del atleta */
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
    /* Se limpia la lista de categorías seleccionadas */
    this.selectedCategoriesList = [];

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

      response[0].day = "Lunes";
      response[1].day = "Martes";
      response[2].day = "Miércoles";
      response[3].day = "Jueves";
      response[4].day = "Viernes";
      response[5].day = "Sábado";
      response[6].day = "Domingo";

      this.daysRegime = response;
    });
  }

  getCategoriesOfDishes() {
    this.regimeService.getMealCategories().subscribe((response) => {
      console.log(response);
      this.dishesCategories = response;
    });
  }

  /* Método que crea un plato nuevo */
  createDish() {
    let dish: DishInterface = {
      name: this.createDishForm.value.name,
      description: this.createDishForm.value.description,
      categories: this.selectedCategoriesList,
    };

    this.regimeService.createDish(dish).subscribe((response) => {
      /* Se refresca la lista de platos */
      this.getDishes();

      /* Se resetea el formulario */
      this.resetCreateDishForm();

      /* Se limpia la lista de categorías seleccionadas */
      this.selectedCategoriesList = [];

      console.log(response);
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
        this.selectedCategoriesList.indexOf(e.target.id),
        1
      );
    }
  }

  /* Método que crea la estructura de la dieta */
  createRegimeStructure() {
    this.regimeService.createRegimeStructure().subscribe((response) => {

      /* Se refresca la lista de dias (estructura de la dieta) */
      this.getDayRegime();

      console.log("Creada estructura de dieta...");
      console.log(response);
    });
  }

  /* Método que gestiona el desplegable de platos seleccionados */
  onChangeDishSelect(e) {
    // console.log(e.target.value);

    /* obtener valor del desplegable */
    let value = e.target.value;

    /* separar valores por el punto */
    let valueSplit = splitAtPeriod((value),[value]);

    /* guardar ambos valores en variables */
    let meal = valueSplit[0];
    let dish = valueSplit[1];

    console.log(valueSplit);
    console.log(meal);
    console.log(dish);

    this.regimeService.addDishToDay(meal, dish).subscribe((response) => {
      /* Se refresca la lista de días */
      this.getDayRegime();

      console.log(response);
    });
  }
}
