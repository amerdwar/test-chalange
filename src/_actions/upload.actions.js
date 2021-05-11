import { uploadConstants } from '../_constants';

export const uploadActions = {
    changeImage,
    clear
};

function changeImage(image) {
    return { type: uploadConstants.CHANGE_IMAGE, image };
}

function clear() {
    return { type: uploadConstants.CLEAR };
}

