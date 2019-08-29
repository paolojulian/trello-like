import isEmpty from '../helpers/is-empty';
import { fetchColumns } from '../api';

const editColumnValidate = async(columnId, data) => {
    let errors = {};

    if ( ! ('title' in data)  || isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if ( ! isEmpty(errors)) {
        return { errors, isValid: false };
    }

    const columnCheck = await fetchColumns(`title_like=${data.title}&id_ne=${columnId}`);
    if (columnCheck.length > 0) {
        errors.title = 'Title already exists'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export default editColumnValidate