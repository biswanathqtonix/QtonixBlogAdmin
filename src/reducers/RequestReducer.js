const requestReducer = (state=[],action) => {
    switch(action.type){
        case 'FETCH_REQUEST_FROM_WEBSITE':
            return action.payload
        default :
            return state;
    }
}
export default requestReducer;