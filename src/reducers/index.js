import {combineReducers} from 'redux'
import userReducer from './userReducer'
import blogcategoryReducer from './blogcategoryReducer'
import blogReducer from './blogReducer'
import pageReducer from './pageReducer'
import logindetailsReducer from './logindetailsReducer'
import requestReducer from './RequestReducer'

const songReducer = () => {
    return[
        {title:'Song1', duration:'4.45'},
        {title:'Song2', duration:'5.45'},
        {title:'Song3', duration:'6.45'},
        {title:'Song4', duration:'7.45'},
        {title:'Song5', duration:'8.45'},
    ]
};

export default combineReducers({
    // songs:songReducer,
    userslist:userReducer,
    blogcategories:blogcategoryReducer,
    blogs:blogReducer,
    pages:pageReducer,
    logindetails:logindetailsReducer,
    requests:requestReducer
})