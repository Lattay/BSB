const express = require('express');
const serveStatic = require('serve-static');

module.exports = fonction(ctx){
    var app = express();

    // Partie publique
    app.get('/', function(req, res){
        res.redirect('/index.html');
    });

    app.get('/document', function(req, res){
        // renvoie au format json la liste des documents
    });

    app.get('/tag', function(req, res){
        // renvoie au format json la liste des tags
    
    });

    // Partie privée
    // app.get('/admin');
    // connexion, interface admin

    app.use(serveStatic(context.public_root, context.default_static_options));
    app.listen(context.port, context.url, function(){
        context.log.info('Listening ' + context.url + ' on port ' + context.port.toString() + '...');
    });
};
