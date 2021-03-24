import { MealRegimeInterface } from "./mealRegimeInterface";

export interface DayRegimeInterface {

    id:number;
    day:string;
    meals:MealRegimeInterface[];
}