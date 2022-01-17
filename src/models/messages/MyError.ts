import MessageError from "./MessageError";

class MyError extends Error {     
    name: string;
    message: string;
    codeError: number;
    arrayError: Array<MessageError>

    constructor(  name: string,  message: string, codeError: number, arrayError: Array<MessageError> ) { 
        super();
        this.name = name;
        this.message = message;
        this.codeError = codeError;
        this.arrayError = arrayError;
    }
}

export default  MyError;