import API from '../api/API'

//GET ALL USERS LIST
export const fetchAllUser = () => async dispatch => {
    const response = await API.get('/user');
    dispatch({type:'FETCH_USERS', payload:response.data.response})
}

//GET ALL BLOGS CATEGORIES
export const fetchAllBlogCategory = () => async dispatch => {
    const response = await API.get('/blogcategory');
    dispatch({type:'FETCH_BLOG_CATEGORIES', payload:response.data.response})
}

//GET ALL BLOGS
export const fetchBlogs = () => async dispatch => {
    const response = await API.get('/blog');
    dispatch({type:'FETCH_ALL_BLOGS', payload:response.data.response})
}

//GET ALL PAGES
export const fetchPages = () => async dispatch => {
    const response = await API.get('/page')
    dispatch({type:'FETCH_ALL_PAGES', payload:response.data})
}

//ADMIN LOGIN
export const userLogin = data =>async dispatch => {
    const response =await API.post('/user/login',data);
    return response.data;
}


//GET LOGIN DETAILS
export const loginDetails = () => async dispatch => {
    const response = await API.get('/user/logindetails')
    dispatch({type:'ALL_LOGIN_DETAILS',payload:response.data})
}

//FETCH ALL REQUESTS
export const getRequestFromUser  = () => async dispatch => {
    const response = await API.get('/googlenotification')
    dispatch({type:'FETCH_REQUEST_FROM_WEBSITE',payload:response.data.data})
}