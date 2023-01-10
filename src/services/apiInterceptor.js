import axios from 'axios';

import * as jwtService from './jwtServices';

const BASE_API_URL = 'https://reqres.in/api/';

let currentRefreshTokenRequest = false
let abortController = new AbortController()

const refreshAbortController = () => {
    abortController = new AbortController()
}

export const abortRequest = () => {
    abortController && abortController?.abort()
    refreshAbortController()
}

const refreshToken = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling refesh token: ')
            currentRefreshTokenRequest = false
            jwtService.setToken('thisismyNewtoken' + Math.random());
            resolve();
        }, 3000);
    });
};

const createAxioInstance = () => {
    console.log('createa axios instance');
    const axiosInstance = axios.create({
        baseURL: BASE_API_URL
    });

    // axiosInstance.defaults.headers.common['Authorization'] = 'mytoken';

    axiosInstance.interceptors.request.use(config => {
        const optionalAcceptOption = config.headers.accept || '';
        const optionalContentTypeOption = config.headers['content-type'] || '';
        config.headers = {
            'Authorization': `Bearer ${jwtService.getToken()}`,
            'Accept': `application/json; ${optionalAcceptOption}`,
            'Content-Type': `application/json; application/x-www-form-urlencoded; multipart/mixed; ${optionalContentTypeOption}; charset=utf-8;`
        };

        return {
            ...config,
            signal: config.isCancelable ? abortController.signal : null
        };
    });

    axiosInstance.interceptors.response.use(response => {
        const { status, statusText, data } = response;
        return { status, statusText, data };
    }, async error => {
        const originalRequest = error.config;
        const { status, statusText, data } = error.code === 'ERR_CANCELED'
            ? { status: 499, statusText: 'CanceledError', data: 'canceled' } : error.response;

        if (status === 401 && !originalRequest._retry) {
            /** This code below show us the way we retry our request */
            originalRequest._retry = true;
            currentRefreshTokenRequest = currentRefreshTokenRequest || refreshToken()
            await currentRefreshTokenRequest;
            return axiosInstance(originalRequest);
        }
        // we can do something to handle error here
        return Promise.reject({ status, statusText, data });
    });

    return axiosInstance;
}

export const ApiInstance = createAxioInstance()
