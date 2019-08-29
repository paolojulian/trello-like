import isEmpty from '../helpers/is-empty';
import { fetchCardsByColumn } from '../api';

const createCardValidate = async(columnId, data) => {
    let errors = {};

    if ( ! ('title' in data)  || isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if ( ! ('description' in data)  || isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    if ( ! isEmpty(errors)) {
        return { errors, isValid: false };
    }

    const cardCheck = await fetchCardsByColumn(columnId, `title_like=${data.title}`);
    if (cardCheck.length > 0) {
        errors.title = 'Title already exists in column'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export default createCardValidate