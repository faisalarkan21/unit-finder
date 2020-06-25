import axios from 'axios';

const BASE_URL = 'https://5d60ae24c2ca490014b27087.mockapi.io/api/v1';

const Get = (url, params = '') => axios.get(`${BASE_URL}/${url}/${params}`).then(({ data }) => data);

export default Get;
