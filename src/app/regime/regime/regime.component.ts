import { splitAtPeriod } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DayRegimeInterface } from '../models/dayRegime.interface';
import { DishInterface } from '../models/dish.interface';
import { DishCategoryInterface } from '../models/dishCategory.interface';
import { MealRegimeInterface } from '../models/mealRegimeInterface';
import { RegimeService } from '../services/regime.service';
import { LogInService } from '../../entry/services/log-in.service';

@Component({
  selector: 'app-regime',
  templateUrl: './regime.component.html',
  styleUrls: ['./regime.component.scss'],
})
export class RegimeComponent implements OnInit {
  /* Variable que almacena la pestaña mostrada actualmente */
  showMenu: string;

  /* Variable que guarda los platos buscados por nombre */
  dishesByName: DishInterface[] = [];

  /* Variable que almacena los platos del atleta */
  dishes: DishInterface[] = [];

  /* Variable que almacena la dieta del atleta */
  daysRegime: DayRegimeInterface[] = [];

  /* Variable que almacena las categorías de los platos */
  dishesCategories: DishCategoryInterface[] = [];

  /* Variable que almacena la lista de categorías seleccionadas */
  selectedCategoriesList: any = [];

  /* Formulario reactivo para la creación del plato */
  createDishForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
  });

  /* Formulario reactivo para la selección del plato */
  selectDishForm = new FormGroup({
    dish: new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
  });

  /* Variable que almacena los platos filtrados, para organizar la dieta */
  dishesFiltered: DishInterface[] = [];

  idSelectedMeal;

  /**
   * FORMULARIO REACTIVO CON EL PLATO PARA AÑADIRLO A LA DIETA
   */
  addDishForm = new FormGroup({
    dish: new FormControl('', Validators.required),
  });

  constructor(
    private regimeService: RegimeService,
    private login: LogInService
  ) {}

  ngOnInit(): void {
    this.login.isUserInSession();
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

  /**
   * Funcion que resetea los valores del formulario en el modal de seleccionar plato
   */
  resetSelectDishForm() {
    /* Se limpia la lista de categorías seleccionadas */
    this.selectedCategoriesList = [];

    /* Se limpia la lista de platos filtrados */
    this.dishesFiltered = [];

    /* Resetear el formulario de añadir amigos */
    this.selectDishForm.reset();
  }

  getDishesByName() {
    this.regimeService
      .getDishesByInitials(this.addDishForm.value.dish)
      .subscribe((response) => {
        if (
          this.addDishForm.value.dish != undefined &&
          this.addDishForm.value.dish != ''
        ) {
          this.dishesByName = response;
        } else {
          this.dishesByName = [];
        }
      });
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

      /* response[0].day = 'Lunes';
      response[1].day = 'Martes';
      response[2].day = 'Miércoles';
      response[3].day = 'Jueves';
      response[4].day = 'Viernes';
      response[5].day = 'Sábado';
      response[6].day = 'Domingo'; */

      this.daysRegime = response;
    });
  }

  getCategoriesOfDishes() {
    /*
    0: {name: "DAYRY", icon: "0_icon"}
    1: {name: "MEAT", icon: "1_icon"}
    2: {name: "FISH", icon: "2_icon"}
    3: {name: "EGG", icon: "3_icon"}
    4: {name: "VEGETABLE", icon: "4_icon"}
    5: {name: "NUT", icon: "5_icon"}
    6: {name: "POTATO", icon: "6_icon"}
    7: {name: "FRUIT", icon: "7_icon"}
    8: {name: "CEREAL", icon: "8_icon"}
    */

    this.dishesCategories = [
      {
        name: '0_name', // DAYRY - lacteos
        icon: 'fas fa-cheese fa-2x',
      },
      {
        name: '1_name', // MEAT - carne
        icon: 'fas fa-drumstick-bite fa-2x',
      },
      {
        name: '2_name', // FISH - pescado
        icon: 'fas fa-fish fa-2x',
      },
      {
        name: '3_name', // EGG - huevo
        icon: 'fas fa-egg fa-2x',
      },
      {
        name: '4_name', // VEGETABLE - verdura
        icon: 'fas fa-carrot fa-2x',
      },
      {
        name: '5_name', // NUT - frutos secos
        icon: 'fas fa-seedling fa-2x',
      },
      {
        name: '6_name', // POTATO - patata
        icon: 'fab fa-product-hunt fa-2x',
      },
      {
        name: '7_name', // FRUIT - frutas
        icon: 'fas fa-apple-alt fa-2x',
      },
      {
        name: '8_name', // CEREAL - cereales
        icon: 'fas fa-bread-slice fa-2x',
      },
    ];

    console.log(this.dishesCategories);

    this.regimeService.getMealCategories().subscribe((response) => {
      for (let i = 0; i < response.length; i++) {
        const category = response[i];
        this.dishesCategories[i].name = category;
      }
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

      console.log('añadir');
      console.log(e.target.id);
      console.log(this.selectedCategoriesList);
    } else {
      /* Eliminar categoría de la lista de categorías seleccionadas */
      this.selectedCategoriesList.splice(
        this.selectedCategoriesList.indexOf(e.target.id),
        1
      );

      console.log('borrar');
      console.log(e.target.id);
      console.log(this.selectedCategoriesList);
    }
  }

  /* Método que crea la estructura de la dieta */
  createRegimeStructure() {
    this.regimeService.createRegimeStructure().subscribe((response) => {
      /* Se refresca la lista de dias (estructura de la dieta) */
      this.getDayRegime();

      console.log('Creada estructura de dieta...');
      console.log(response);
    });
  }

  // /* Método que gestiona el desplegable de platos seleccionados */
  // onChangeDishSelect(e) {
  //   // console.log(e.target.value);

  //   /* obtener valor del desplegable */
  //   let value = e.target.value;

  //   /* separar valores por el punto */
  //   let valueSplit = splitAtPeriod(value, [value]);

  //   /* guardar ambos valores en variables */
  //   let meal = valueSplit[0];
  //   let dish = valueSplit[1];

  //   console.log(valueSplit);
  //   console.log(meal);
  //   console.log(dish);

  //   this.regimeService.addDishToDay(meal, dish).subscribe((response) => {
  //     /* Se refresca la lista de días */
  //     this.getDayRegime();

  //     console.log(response);
  //   });
  // }

  addIconToCategory(category: string): string {
    switch (category) {
      case 'DAYRY':
        return 'fas fa-cheese fa-2x';
        break;

      case 'MEAT':
        return 'fas fa-drumstick-bite fa-2x';
        break;

      case 'FISH':
        return 'fas fa-fish fa-2x';
        break;

      case 'EGG':
        return 'fas fa-egg fa-2x';
        break;

      case 'VEGETABLE':
        return 'fas fa-carrot fa-2x';
        break;

      case 'NUT':
        return 'fas fa-seedling fa-2x';
        break;

      case 'POTATO':
        return 'fab fa-product-hunt fa-2x';
        break;

      case 'FRUIT':
        return 'fas fa-apple-alt fa-2x';
        break;

      case 'CEREAL':
        return 'fas fa-bread-slice fa-2x';
        break;

      default:
        break;
    }

    /* iconsList = [
      "fas fa-cheese fa-2x",
      "fas fa-drumstick-bite fa-2x",
      "fas fa-fish fa-2x",
      "fas fa-egg fa-2x",
      "fas fa-carrot fa-2x",
      "fas fa-seedling fa-2x",
      "fab fa-product-hunt fa-2x",
      "fas fa-apple-alt fa-2x",
      "fas fa-bread-slice fa-2x"
    ] */
  }

  /* Método que gestiona el checkbox de categorías */
  onCheckboxChangeForSelectDish(e) {
    if (e.target.checked) {
      /* Añadir categoría a la lista de categorías seleccionadas */
      this.selectedCategoriesList.push(e.target.id);

      console.log('añadir');
      console.log(e.target.id);
      console.log(this.selectedCategoriesList);

      this.getDishesFiltered();
    } else {
      /* Eliminar categoría de la lista de categorías seleccionadas */
      this.selectedCategoriesList.splice(
        this.selectedCategoriesList.indexOf(e.target.id),
        1
      );

      console.log('borrar');
      console.log(e.target.id);
      console.log(this.selectedCategoriesList);

      this.getDishesFiltered();
    }
  }

  /* Obtener platos filtrados por la categoría seleccionada */
  getDishesFiltered() {
    /* resetear lista de platos filtrados */
    this.dishesFiltered = [];

    for (const dish of this.dishes) {
      let categoriesCont = 0;

      for (let category of this.selectedCategoriesList) {
        category = category.slice(2, category.length);

        console.log('category');
        console.log(category);

        if (dish.categories.includes(category)) {
          categoriesCont++;
        }

        if (this.selectedCategoriesList.length == categoriesCont) {
          this.dishesFiltered.push(dish);
        }
      }
    }

    console.log(this.dishesFiltered);
  }

  /* Método que establece un plato a la comida (meal) correspondiente */
  setDishToMeal(e) {
    // Obtener el id del plato
    let dish = e.id;

    this.regimeService
      .addDishToDay(this.idSelectedMeal, dish)
      .subscribe((response) => {
        /* Se refresca la lista de días */
        this.getDayRegime();

        /* Se limpia el formulario de agregar plato a una comida de la dieta */
        this.resetSelectDishForm();

        console.log(response);

        this.dishesByName = [];
        this.addDishForm.reset();
      });
  }

  /* Método que establece el id de la comida (meal) seleccionada */
  setMeal(mealId: any) {
    this.idSelectedMeal = mealId;
  }

  /* Método que cambia la visibilidad de los platos, para mostrar los detalles */
  toggleDisplay(e) {
    let cardBody = e.target.nextSibling;

    if (cardBody.classList.contains('d-none')) {
      cardBody.classList.remove('d-none');
    } else {
      cardBody.classList.add('d-none');
    }
  }
}
