import axios from 'axios';

const serverPrefix = 'https://my-json-server.typicode.com/';
    
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    accept: 'application/json',
});

const sendRequest = (url, options) =>
    axios({
        ...options,
        url: serverPrefix + url,
        headers: getHeaders(),
    });

export const crudBuilder = url => ({
    get: () =>sendRequest(url,{method: 'GET'}),
});