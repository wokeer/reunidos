export default {
    baseUrl: 'http://localhost:5000/api/v1/',
    // baseUrl: 'https://api.dev.reunidos.co/api/v1/',
    endpoints: {
  
      sendCode: 'sendCode',
      auth: 'auth',
      authenticate: 'authenticate',
      plate: 'plate',
      res_branch_office: 'res_branch_office',
      citiesAll: 'cities/dropdown_cities',
      cities: 'cities',
      customersUpdate: 'customers/update',
      dish_categories: 'dish_categories',
      customers: 'customers',
      res_restaurant: 'res_restaurant',
      orders: 'orders',
    },
    //  image: 'https://campopticofiles.s3.us-east-2.amazonaws.com/examenes',
     image: 'http://localhost:5000/api/v1',
  };
  