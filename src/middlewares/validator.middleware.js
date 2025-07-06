const bodyValidator = (rules) => {
    return async (req, res, next) => {
        try{
            const data = req.body;
            if(!data){
                next({
                    error: null,
                    message: "Data excepted",
                    code: 422
                })
            }
            await rules.validateAsync(data, {abortEarly: false});
            next()
        } catch(exception){
            // validation failed exception
            // Todo : handle exception
            
            let errObj = {}
            exception.details.map((error) => {
                errObj[error.context.key] = error.message
            })
            res.status(400).json({
                error: errObj,
                message: "Validation failed",
                status: "ERR_VALIDATION_FAILED"
            })
        }
    }
}

module.exports = bodyValidator