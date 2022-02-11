import MyError from "../MyError";

const isCompanyNoExistsError = (): MyError => {
    const error: MyError = MyError.badRequest('company create');
    error.arrayError.push({
        message: 'company with that name  already exists!',
        field: 'Company name '
    })

    return error
}

const validateCompanyExistsError = (): MyError => {
    const error: MyError = MyError.notFound('company exists');
    error.arrayError.push({
        message: 'company with that ID does not exist!',
        field: 'company id '
    })

    return error;
}

const validateCompanyUpdateFieldsExistsError = (): MyError=> {
    const error: MyError = MyError.badRequest('company create');
    error.arrayError.push({
        message: 'Input fields are empty! You must provide at least one input field',
        field: 'Company name and logo'
    })
       
    return error;
}

export { isCompanyNoExistsError, validateCompanyExistsError, validateCompanyUpdateFieldsExistsError }