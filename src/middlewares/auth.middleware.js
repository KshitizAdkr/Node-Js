const checkLogin = (allowedRoles = null) => {
    return(req, res, next) => {
        //
         // TODO: login check
        // success
        // TODO: allowedRoles not null
        // userRole => allowedRoles
        // success
        // not allowed
        // return error
        next();
    };
};

module.exports = checkLogin