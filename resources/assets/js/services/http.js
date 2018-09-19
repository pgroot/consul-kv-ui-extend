import axios from 'axios';

/**
 *
 * @return {object} Promise
 */
function axiosInstance() {
    return axios.create({
        timeout: 300 * 1000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn;q=0.9,en-us;q=0.8',
            'Accept': 'application/json, text/plain, */*'
        },
        withCredentials: true,
        validateStatus: status => status === 200
    });
}

/**
 *
 * @param {string} path
 * @return {string} url
 */
function urlFormat(path) {
    if (path.substr(0, 4) === 'http') {
        return path;
    }

    return '/rest/api' + path;
}

/**
 *
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @param {string} type
 * @return {promise} promise
 */
function response(url, params, options = {messagebox: true}, type) {
    return new Promise((resolve, reject) => {
        axiosInstance()[type](urlFormat(url, options.server), params).then((response) => {
            let data = response.data;

            if (!data.meta) {
                reject('Missing meta');
            }

            if (data.meta.code === 0) {
                resolve(data.payload);
            } else {
                reject(data.meta);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * axios http
 * @return {promise} Promise
 */
export function createHttpClient() {
    return {
        post(url, params, options) {
            return response(url, params, options, 'post');
        },
        get(url, params, options) {
            return response(url, { params }, options, 'get');
        },
        put(url, params, options) {
            params = Object.assign({}, params, {
                _method: 'PUT'
            });

            return response(url, params, options, 'post');
        },
        delete(url, params, options) {
            params = Object.assign({}, params, {
                _method: 'DELETE'
            });

            return response(url, params, options, 'post');
        }
    };
}
