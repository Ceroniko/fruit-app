import { Fruit } from '@dataTypes/fruits';
import { fruitsApiRoutes } from '@routes/apiRoutes';
import { listOfFruits } from '@schemas/fruit';
import { buildQueryFn } from '@utils/query.utils';

const getAllFruitsQueryFn = () => {
  const url = fruitsApiRoutes.getAllFruits();
  return buildQueryFn<Fruit[]>(url, { validator: listOfFruits });
};

const fruitsAPI = {
  getAllFruitsQueryFn,
};

export { fruitsAPI };
