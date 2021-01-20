const blogReducer = (state=[], action) => {
    switch(action.type){
        case 'FETCH_ALL_BLOGS':
            return action.payload
        default:
            return state
    }
}
export default blogReducer;