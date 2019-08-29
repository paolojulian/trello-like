import isEmpty from '../helpers/is-empty';

const createColumnValidate = (data) => {
    let errors = {};

    if ( ! ('title' in data)  || isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export default createColumnValidate