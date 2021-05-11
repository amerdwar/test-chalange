import { alertModalConstants } from '../_constants';

export const alertModalActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertModalConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertModalConstants.ERROR, message };
}

function clear() {
    return { type: alertModalConstants.CLEAR };
}