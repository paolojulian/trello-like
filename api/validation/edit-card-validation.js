import isEmpty from '../helpers/is-empty';
import { fetchCards } from '../api';

const createCardValidate = async({ cardId, data }) => {
    let errors = {};
    console.log(data)

    if ( ! ('title' in data)  || isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if ( ! isEmpty(errors)) {
        return { errors, isValid: false };
    }

    const cardCheck = await fetchCards(`title_like=${data.title}&id_ne=${cardId}`);
    if (cardCheck.length > 0) {
        errors.title = 'Title already exists'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export default createCardValidate