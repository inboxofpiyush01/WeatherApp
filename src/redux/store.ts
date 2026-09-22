import {legacy_createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import weatherReducer from './reducers/weatherReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(persistedReducer);
export const persistor = persistStore(store);
