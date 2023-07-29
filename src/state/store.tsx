import { configureStore } from "@reduxjs/toolkit";
import selectedPageSlice from "./slices/selectedPageSlice";
import selectedPageReducer from "./slices/selectedPageSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedSelectedPageReducer = persistReducer(persistConfig, selectedPageReducer)

const store = configureStore({
    reducer: {
        selectedPage: persistedSelectedPageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

export const persistor = persistStore(store)