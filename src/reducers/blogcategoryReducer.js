const blogcategoryReducer = (state=[], action) => {
    switch(action.type){
        case 'FETCH_BLOG_CATEGORIES':
            return action.payload 
        default:
            return state
    }
}

export default blogcategoryReducer;