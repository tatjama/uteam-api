interface MessageError {    
    message: string,    
    field: string,
}

class MyError extends Error {   
    
    codeError: number;  
    name: string;
    message: string;
    arrayError: Array<MessageError>

    constructor( codeError: number, name: string,  message: string, arrayError: Array<MessageError> ) { 
        super();
        this.codeError = codeError;
        this.name = name;
        this.message = message;        
        this.arrayError = arrayError;
    }

    static badRequest( message:string ){
        return new MyError( 400, 'Bad request', message, [] );
    }

    static notFound( message:string ){
        return new MyError( 404, 'Not found', message, [] );
    }

    static forbidden( message:string ){
        return new MyError( 403, 'Forbidden', message, [])
    }
    
    static  internal( message:string ){
        return new MyError( 500, 'Internal Error', message, [])
    }
}

export default  MyError;