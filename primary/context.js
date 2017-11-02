// Configuration générale

const fs = require('fs');
const path = require('path');
//const path = require('path');

// exports est un alias de module.exports
module.exports = function(config_file){
    var ctx;
    try{
        ctx = JSON.parse(fs.readFileSync(config_file));
    } catch(err) {
        console.log('Unable to load or parse global config file ' + config_file);
        throw err;
    }
    
    ctx.private_root = path.join(ctx.root_path, '/static/private');
    ctx.public_root = path.join(ctx.root_path, '/static/public');
    ctx.database_path = path.join(ctx.root_path, ctx.database);

    return ctx;
};
