
class EmptyFieldsException extends Error {
    constructor(errors = {}, ...args) {
        super(...args);
        this.name = 'EmptyFieldsException';
        this.errors = errors;
        Error.captureStackTrace(this, EmptyFieldsException);
    }
}
export default EmptyFieldsException;