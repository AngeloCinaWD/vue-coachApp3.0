import { createStore } from 'vuex';

import coaches from './modules/coaches/index.js';
import requests from './modules/requests/index.js';
import auth from './modules/auth/index.js';

const store = createStore({
  modules: {
    coaches: coaches,
    requests: requests,
    auth: auth,
  },
});

export default store;
