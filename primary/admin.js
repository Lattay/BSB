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

    admin.add = function(req, res){
        var data = req.body;
        data.doc = req.files['document'][0];
        data.thumb = req.files['thumbnails'][0];

        context.database.addDoc(data, function(err){
            if(err){
                context.log.error(err);
                res.send('err');
            } else {
                res.send('ok');
            }
        });
    };

    admin.remove = function(req, res){
        var id = req.body['id'];
        context.database.delDoc(id, function(err){
            if(err){
                context.log.error(err);
                res.send('err');
            } else {
                res.send('ok');
            }
        });
    };

    admin.modify = function(req, res){
        // modifie les informations ou la miniature (pas le document lui même)
        var data = req.body;
        data.doc = req.files['thumbnails'][0];
        context.database.modDoc(data, function(err){
            if(err){
                context.log.error(err);
                res.send('err');
            } else {
                res.send('ok');
            }
        });
    };

    return admin;
};
