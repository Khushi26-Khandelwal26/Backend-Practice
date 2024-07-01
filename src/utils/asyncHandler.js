//this is a wrapper function...it can be performed by two methods...
//one with async await...other with promise

/*
const asyncHandler = (fn) => async(req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500 ).json({
            success : false,
            message : error.message
        })

    }
}
*/

// this is the another syntax
const asyncHandler =(requestHandler)=>{
    Promise
    .resolve(requestHandler(req,res,next))
    .reject((err)=>next(err))
}
export {asyncHandler}
