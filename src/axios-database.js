import axios from 'axios';

const instance = axios.create( {
    withCredentials: false,

    baseURL:'https://reptile-mn.firebaseio.com/'
});

export default instance;