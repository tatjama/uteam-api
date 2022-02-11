import MyError from "../MyError";

export const internalError = (): MyError => {
    const error: MyError = MyError.internal('error');
    error.arrayError.push({
        message: 'Something get wrong!',
        field: 'all'
    })
    return error;
}