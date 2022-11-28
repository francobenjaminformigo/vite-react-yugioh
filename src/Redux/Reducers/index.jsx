const reducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_RESULTS':
            return {
                ...state,
                results: [...action.payload]
            }
        case 'SET_IS_LOADING':
            return {
                ...state, isLoading: action.payload
            }
        case 'UPDATE_RESULTS_CARDS':
            return {
                ...state,
                results: [...state.results,...action.payload]
            }
        case 'SET_NEXT_PAGE_TO_LOAD':
            return {
                ...state,
                nextPageToLoad: action.payload
            }
        case 'SET_HAS_MORE_CARDS_TO_LOAD':
            return {
                ...state, hasMoreCardsToLoad: action.payload
            }
        
    }
    return state
}

export default reducer;