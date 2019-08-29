import isEmpty from '../helpers/is-empty';

const createCardValidate = (data) => {
    let errors = {};

    if ( ! ('title' in data)  || isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if ( ! ('description' in data)  || isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export default createCardValidate