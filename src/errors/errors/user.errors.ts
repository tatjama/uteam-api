import MyError from "../MyError";

const findUserFromJWTError = (): MyError => {
    const error: MyError= MyError.notFound('JWT extract');
    error.arrayError.push({
        message: 'User with that username does not exists!',
        field: 'userId'
    })

    return error;
}

const extractUserIdFromJWTError = (): MyError => {
    const error: MyError= MyError.notFound('JWT extract');
    error.arrayError.push({
        message: 'There is no username at JWT payload!',
        field: 'JWT payload'
    })

    return error;
}

const validateUserNoExistsError = (): MyError => {
    const error: MyError = MyError.badRequest('user create');
    error.arrayError.push({
        message: 'User with that username or email already exists!',
        field: 'username or email'
    })
    return error;
}

const validateRegisterUserFieldsExistsError = (): MyError => {
    const error: MyError = MyError.badRequest('user create');
    error.arrayError.push({
        message: 'Missing username, email or password',
        field: 'username, email or password'
    })
    return error;
}

export { findUserFromJWTError, extractUserIdFromJWTError, validateUserNoExistsError, validateRegisterUserFieldsExistsError }