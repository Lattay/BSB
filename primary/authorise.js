/* eslint-disable no-unused-vars */
module.exports = function(context){
    var authorise = function(route_ko){
        var cb = function(req, res, next){
            if(req.session.logged){
                next();
            } else {
                res.redirect(route_ko);
            }
        };
        return cb;
    };
    return authorise;
};
