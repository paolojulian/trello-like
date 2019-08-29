import isEmpty from '../helpers/is-empty';
import { fetchCards } from '../api';

const createCardValidate = async(data) => {
    let errors = {};

    if ( ! ('title' in data)  || isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if ( ! isEmpty(errors)) {
        return { errors, isValid: false };
    }

    const cardCheck = await fetchCards(`title=${data.title}`);
    if (cardCheck.length > 0) {
        errors.title = 'Title already exists'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export default createCardValidate