import { articleConstants } from '../_constants';
import { articleService } from '../_services';
import { alertModalActions } from './';
import { history } from '../_helpers';

export const articleActions = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};




function create(article) {
    return dispatch => {
        dispatch(request(article));

        articleService.create(article)
            .then(
                res => { 
                    
                    dispatch(success());
                
                    dispatch(alertModalActions.success('Creation successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertModalActions.error(error.toString()));
                }
            );
    };

    function request(article) { return { type: articleConstants.CREATE_REQUEST, article } }
    function success() { return { type: articleConstants.CREATE_SUCCESS } }
    function failure(error) { return { type: articleConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        articleService.getAll()
            .then(
                articles => dispatch(success(articles)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: articleConstants.GETALL_REQUEST } }
    function success(articles) { return { type: articleConstants.GETALL_SUCCESS, articles } }
    function failure(error) { return { type: articleConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        articleService.delete(id)
            .then(
                article => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: articleConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: articleConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: articleConstants.DELETE_FAILURE, id, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        articleService.getById(id)
            .then(
                article => dispatch(success(article)),
                error => dispatch(failure( error.toString()))
            );
    };

    function request(id) { return { type: articleConstants.GETBYID_REQUEST, id } }
    function success(article) { return { type: articleConstants.GETBYID_SUCCESS, article } }
    function failure(error) { return { type: articleConstants.GETBYID_FAILURE,  error } }
}
function update(article) {
    return dispatch => {
        dispatch(request(article));

        articleService.update(article)
            .then(
                    article => {
                        dispatch(alertModalActions.success('Edit successful'));
                        dispatch(success(article));
                    },
                    error => dispatch(failure( error.toString()))
                );
    };

    function request(article) { return { type: articleConstants.UPDATE_REQUEST, article } }
    function success(article) { return { type: articleConstants.UPDATE_SUCCESS, article } }
    function failure(error) { return { type: articleConstants.UPDATE_FAILURE, error } }
}
