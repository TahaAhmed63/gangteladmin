import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import productReducer from './slices/subadmin';
import elementReducer from './slices/supervisor';
import magictypeReducer from './slices/magictype';
import departReducer from './slices/department';
import vehicleReducer from './slices/vehicle';
import gangReducer from './slices/gang';
import chapterReducer from './slices/chapter';
import gangmember from './slices/Member';
import positionReducer from './slices/position';


const rootPersistConfig = {
  key: 'root',
  storage,
  // keyPrefix: 'redux-',
  // whitelist: [],
};

// const productPersistConfig = {
//   key: 'product',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout'],
// };

const rootReducer = combineReducers({

  element: elementReducer,
  magictype: magictypeReducer,
  depart: departReducer,
  vehicle: vehicleReducer,
  product: productReducer,
  gang: gangReducer,
  position: positionReducer,
  chapter: chapterReducer,
  member: gangmember,

});

export { rootPersistConfig, rootReducer };
