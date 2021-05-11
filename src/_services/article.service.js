
import { authHeader } from '../_helpers';
import config from '../config'
export const articleService = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};




function getAll() {
    debugger;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/articles`, requestOptions).then(handleResponse);
}

function create(article) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    };

    return fetch(`${config.apiUrl}/articles/create`, requestOptions).then(handleResponse);
}
function update(article) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    };

    return fetch(`${config.apiUrl}/articles/update`, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/articles/${id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/articles/${id}`, requestOptions).then(handleResponse);
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}