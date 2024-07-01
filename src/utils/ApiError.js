//this is to standardalise the way errors are given
class ApiError extends Error{
    constructor(
        statusCode,
        message = 'something went wrong',
        errors = [], //multiple errors ke liye array
        statck = "" //error stack
    ){
        super(message) // to overwrite msg
        this.statusCode = statusCode //we are overwriting the values
        this.errors = errors
        this.data = null
        this.message = message
        this.success = false

        if(statck){
            this.stack = statck
        }
        else {
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}