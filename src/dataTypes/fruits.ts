type Fruit = {
  id: number;
  name: string;
  family: string;
  genus: string;
  order: string;
  nutritions: FruitNutritions;
};

type FruitNutritions = {
  carbohydrates: number;
  protein: number;
  fat: number;
  calories: number;
  sugar: number;
};

type Nutrition = keyof FruitNutritions;

type FruitsGroup = {
  groupName: string;
  fruits: Fruit[];
};

export type { Fruit, FruitNutritions, FruitsGroup, Nutrition };
