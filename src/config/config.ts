const isProduction = import.meta.env.MODE === 'production';

const CONFIG = {
  FRUITS_API_BASE_URL: isProduction ? 'https://www.fruityvice.com/api' : `${location.origin}/fruitsApi`,
};

export { CONFIG };
