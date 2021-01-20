const pageReducer = (state=[], action) => {
    switch(action.type){
        case 'FETCH_ALL_PAGES':
            return action.payload
        default:
            return state
    }
}
export default pageReducer;