export interface IProduct {
    _id: string;
    name: string;
    category: string;
    price: number;
    calories: number;
    ingredients: string[];
    quantity: number;
    image?: string; // Optional image field
  }