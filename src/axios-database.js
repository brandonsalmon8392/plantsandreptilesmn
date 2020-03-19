import axios from 'axios';

const instance = axios.create( {
    baseURL:'https://reptile-mn.firebaseio.com/'
});

export default instance;