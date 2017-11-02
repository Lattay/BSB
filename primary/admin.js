/* admin.js
 * Définie les callback utilisé pour les actions d'administration
 */
module.exports = function(context){
    var admin = new Object();

    admin.authorise = function(route_ko){
        var cb = function(req, res, next){
            if(req.session.logged){
                next();
            } else {
                res.redirect(route_ko);
            }
        };
        return cb;
    };
 
    admin.login = function(req, res){
        context.database.checkPassword(req.body.password, function(passok){
            if(passok){
                req.session.logged = true;
                res.send('ok');
            } else {
                res.send('error');
            }
        });
    };

    admin.add = 0;
    admin.remove = 0;
    admin.modify = 0;
    return admin;
};
