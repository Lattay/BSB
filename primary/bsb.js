const express = require('express');
const serveStatic = require('serve-static');
const session = require('express-session');

const multer  = require('multer');

module.exports = function(ctx){
    var app = express();

    app.set('views', ctx.views_path);
    app.set('view engine', 'ejs');

    app.use(session(ctx.session_config));

    // Partie publique
    app.get('/', function(req, res){
        ctx.database.getDocList(function(err, docs){
            if(err){
                res.status(500).send('Internal Error');
            } else {
                res.render('index', { 'admin' : false, 'rows' : docs });
            }
        });
    });

    app.get('/document/:id', function(req, res){
        // renvoie au format json la liste des documents
        ctx.database.getDoc(req.params.id, function(err, doc){
            if(err){
                res.status(500).send('Internal Error');
            } else {
                res.render('document', doc);
            }
        });
    });

    // Partie privée
    const body_parser = multer(ctx.upload_conf).fields([{ 'name' : 'thumbnail', 'maxCount' : 1}, { 'name' : 'document', 'maxCount' : 1}]);
    const admin = require('./admin')(ctx);
    app.get('/admin/login', body_parser, admin.login);

    app.delete('/admin/rm/:id', admin.authorise('/login.html'), admin.remove);
    app.post('/admin/add', body_parser, admin.authorise('/login.html'), admin.add);
    app.post('/admin/mod', body_parser, admin.authorise('/login.html'), admin.modify);


    app.get('/admin', function(req, res){
        ctx.database.getDocList(function(err, docs){
            if(err){
                res.status(500).send('Internal Error');
            } else {
                res.render('index', { 'admin' : true, 'rows' : docs });
            }
        });
    });

    app.get('/admin/document/:id', function(req, res){
        // renvoie au format json la liste des documents
        if(req.params.id == 'new'){
            res.render('admin_document', {
                'new' : true,
                'title' : '',
                'type' : 'Livre',
                'thumbnail' : '/static/public/pictures/no_thumb.png',
                'description' : '',
                
            });
        } else {
            ctx.database.getDoc(req.params.id, function(err, doc){
                if(err){
                    res.status(500).send('Internal Error');
                } else {
                    doc.new = false;
                    res.render('admin_document', doc);
                }
            });
        }
    });

    app.use('/admin/*', admin.authorise('/login.html'), serveStatic(ctx.private_root, ctx.default_static_options));
    // connexion, interface admin

    app.use(serveStatic(ctx.public_root, ctx.default_static_options));
    app.listen(ctx.port, ctx.url, function(){
        ctx.log.info('Listening ' + ctx.url + ' on port ' + ctx.port.toString() + '...');
    });
};
