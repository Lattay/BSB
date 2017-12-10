const path = require('path');
const crypto = require('crypto');
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
            } else if(!doc){
                res.status(404).send('Aucun document trouvé.');
            } else {
                res.render('document', doc);
            }
        });
    });

    // Partie privée

    // Préparation de multer
    var storage = multer.diskStorage({
        'destination' : ctx.upload_path,
        'filename' : function(req, file, cb){
            crypto.pseudoRandomBytes(16, function(err, raw){
                if(err){
                    cb(err);
                } else {
                    cb(null, raw.toString('hex') + path.extname(file.originalname));
                }
            });
        }
    });
    const body_parser = multer({'storage' : storage}).fields([{ 'name' : 'thumbnail', 'maxCount' : 1}, { 'name' : 'document', 'maxCount' : 1}]);
    const admin = require('./admin')(ctx);

    app.post('/admin/login', body_parser, admin.login);
    app.get('/admin/logout', admin.logout);

    app.get('/admin/logins', admin.authorise('/login.html'), admin.login_list);

    app.post('/admin/create_pass', body_parser, admin.authorise('/login.html'), admin.add_login);

    app.delete('/admin/del_pass/:id', admin.authorise('/login.html'), admin.del_login);

    app.delete('/admin/rm/:id', admin.authorise('/login.html'), admin.remove);
    app.post('/admin/add', body_parser, admin.authorise('/login.html'), admin.add);
    app.post('/admin/mod', body_parser, admin.authorise('/login.html'), admin.modify);


    app.get('/admin', admin.authorise('/login.html'), function(req, res){
        ctx.database.getDocList(function(err, docs){
            if(err){
                res.status(500).send('Internal Error');
            } else {
                res.render('index', { 'admin' : true, 'rows' : docs });
            }
        });
    });

    app.get('/admin/document/:id', admin.authorise('/login.html'), function(req, res){
        // Affiche la page de modification d'un document
        if(req.params.id == 'new'){
            res.render('admin_document', {
                'new_doc' : true,
                'title' : '',
                'type' : 'Livre',
                'thumbnail' : '/pictures/no_thumb.png',
                'description' : '',
                
            });
        } else {
            ctx.database.getDoc(req.params.id, function(err, doc){
                if(err){
                    res.status(500).send('Une erreur est survenue.');
                } else if(!doc){
                    res.status(404).send('Aucun document trouvé.');
                } else {
                    doc.new_doc = false;
                    res.render('admin_document', doc);
                }
            });
        }
    });

    app.use(serveStatic(ctx.public_root, ctx.default_static_options));
    app.listen(ctx.port, ctx.url, function(){
        ctx.log.info('Listening ' + ctx.url + ' on port ' + ctx.port.toString() + '...');
    });
};
