import { Fruit, FruitNutritions } from '@dataTypes/fruits';
import { z } from 'zod';

const fruitNutritionsSchema = z
  .object({
    calories: z.number(),
    carbohydrates: z.number(),
    fat: z.number(),
    protein: z.number(),
    sugar: z.number(),
  })
  .required() satisfies z.ZodType<FruitNutritions>;

const fruitSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    family: z.string(),
    genus: z.string(),
    order: z.string(),
    nutritions: fruitNutritionsSchema,
  })
  .required() satisfies z.ZodType<Fruit>;

const listOfFruits = z.array(fruitSchema);

export { fruitNutritionsSchema, fruitSchema, listOfFruits };
