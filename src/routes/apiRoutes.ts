import { CONFIG } from '@config/config';

const fruitsApiRoutes = {
  getAllFruits: () => `${CONFIG.FRUITS_API_BASE_URL}/fruit/all`,
  getFruitsByNutritionLevel: (nutrition: string) => `${CONFIG.FRUITS_API_BASE_URL}/fruit/${nutrition}`,
  getFruitsByFamily: (family: string) => `${CONFIG.FRUITS_API_BASE_URL}/fruit/family/${family}`,
  getFruitsByGenus: (genus: string) => `${CONFIG.FRUITS_API_BASE_URL}/fruit/genus/${genus}`,
  getFruitsByOrder: (order: string) => `${CONFIG.FRUITS_API_BASE_URL}/fruit/order/${order}`,
};

export { fruitsApiRoutes };
