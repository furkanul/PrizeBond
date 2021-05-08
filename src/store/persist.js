import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { reducer, initialState } from './redux'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)


export const store = createStore(persistedReducer, initialState)
export const persistor = persistStore(store)



