import { DishCategoryInterface } from "./dishCategory.interface";
export interface DishInterface {

    id?:number;
    name:string;
    description:string;
    categories?:DishCategoryInterface[];
}

/* 
export interface DishInterface {

    id?:number;
    name:string;
    description:string;
    categories?:string[];
}
*/