// Bit Spilling Box : Création de mot de passe
const context = require('./primary/context')('bsb.json');

context.log = require('./primary/logger')(context);
context.database = require('./primary/database')(context);


context.database.setPassword('init', 'password', function(err){
    if(err){
        context.log.error(err);
    }
});
