const logindetailsReducer = (state=[],action) => {
    switch(action.type){
        case 'ALL_LOGIN_DETAILS':
            return action.payload
        default :
            return state
    }
}
 
export default logindetailsReducer;