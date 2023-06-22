import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer} from '../reducers/ApiFetchReducer';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import {cartReducer} from '../reducers/cartReducer';
import {wishlistReducer} from '../reducers/wishlistReducer';
import {authReducer} from '../reducers/authReducer';
import addressReducer from '../reducers/addressReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  products: reducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
  address: addressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer, applyMiddleware(thunk));
export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
