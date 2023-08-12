import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/subadmin';
import elementReducer from './slices/element';
import magictypeReducer from './slices/magictype';
import departReducer from './slices/department';
import rarityReducer from './slices/rarity';
import spellReducer from './slices/spell';
import characterReducer from './slices/character';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  element:elementReducer,
  magictype:magictypeReducer,
  depart:departReducer,
  rarity:rarityReducer,
  spell:spellReducer,
  character:characterReducer,
  product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
