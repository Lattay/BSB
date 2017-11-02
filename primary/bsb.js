const express = require('express');
const serveStatic = require('serve-static');
const session = require('express-session');

module.exports = function(ctx){
    var app = express();

    app.use(session(ctx.session_config));
    // Partie publique
    app.get('/', function(req, res){
        res.redirect('/index.html');
    });

    app.get('/document', function(req, res){
        // renvoie au format json la liste des documents
        ctx.database.getDocuments(function(err, docs){
            if(err){
                res.status(500).send('Internal Error');
            } else {
                res.json(docs);
            }
        });
    });

    app.get('/tag', function(req, res){
        // renvoie au format json la liste des tags
        res.send('');
    });

    // Partie privée
    const admin = require('./admin')(ctx);
    app.get('/admin/login', admin.login);

    app.post('/add', admin.authorise('/login.html'), admin.add);
    app.post('/rm', admin.authorise('/login.html'), admin.remove);
    app.post('/mod', admin.authorise('/login.html'), admin.modify);


    app.use(admin.authorise('/login.html'), serveStatic(ctx.private_root, ctx.default_static_options));
    // connexion, interface admin

    app.use(serveStatic(ctx.public_root, ctx.default_static_options));
    app.listen(ctx.port, ctx.url, function(){
        ctx.log.info('Listening ' + ctx.url + ' on port ' + ctx.port.toString() + '...');
    });
};
