import MyError from "../MyError";

const isProfileNoExistsError = (): MyError => {
    const error: MyError= MyError.badRequest('profile create');
    error.arrayError.push({
        message: 'profile for that user already exists!',
        field: 'UserId '
    })

    return error;
}

const isProfileNameExistsError = (): MyError => {
    const error: MyError= MyError.badRequest('profile create');
    error.arrayError.push({
        message: 'Profile name exists.Please change profile name',
        field: 'profile name '
    })

    return error;
}

const emptyProfileInputError = (): MyError => {
    const error: MyError= MyError.badRequest('profile create');
    error.arrayError.push({
        message: 'Input fields are empty! You must provide at least one input field.',
        field: 'profile name and profile Photo '
    })

    return error;
}

const validateProfileExistsError = (): MyError => {
    const error: MyError = MyError.notFound('profile exists');
    error.arrayError.push({
        message: 'profile with that ID does not exist!',
        field: 'profile id '
    })

    return error;
}

export { isProfileNoExistsError, isProfileNameExistsError, emptyProfileInputError, validateProfileExistsError }