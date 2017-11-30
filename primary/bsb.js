const express = require('express');
const serveStatic = require('serve-static');
const session = require('express-session');

const multer  = require('multer');

module.exports = function(ctx){
    var app = express();

    app.use(session(ctx.session_config));
    // Partie publique
    app.get('/', function(req, res){
        res.redirect('/index.html');
    });

    app.get('/document', function(req, res){
        // renvoie au format json la liste des documents
        ctx.database.getDocList(function(err, docs){
            if(err){
                res.status(500).send('Internal Error');
            } else {
                res.json(docs);
            }
        });
    });

    // Partie privée
    const body_parser = multer(ctx.upload_conf).fields([{ 'name' : 'thumbnail', 'maxCount' : 1}, { 'name' : 'document', 'maxCount' : 1}]);
    const admin = require('./admin')(ctx);
    app.get('/admin/login', admin.login);

    app.post('/add', body_parser, admin.authorise('/login.html'), admin.add);
    app.post('/rm', body_parser, admin.authorise('/login.html'), admin.remove);
    app.post('/mod', body_parser, admin.authorise('/login.html'), admin.modify);


    app.use(admin.authorise('/login.html'), serveStatic(ctx.private_root, ctx.default_static_options));
    // connexion, interface admin

    app.use(serveStatic(ctx.public_root, ctx.default_static_options));
    app.listen(ctx.port, ctx.url, function(){
        ctx.log.info('Listening ' + ctx.url + ' on port ' + ctx.port.toString() + '...');
    });
};
