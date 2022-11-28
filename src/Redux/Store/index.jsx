import reducer from "../Reducers";
import { configureStore } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    results: [],
    nextPageToLoad: '',
    hasMoreCardsToLoad: false
}

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
})

export default store;
