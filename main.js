// Bit Spilling Box
const context = require('primary/context')('bsb.json');

context.log = require('primary/logger')(context);
context.database = require('primary/shortersql')(context);

require('primary/bsb')(context);

process.on('SIGINT', function(){
    context.log.warning('sigint received.');
    context.database.close()
    process.exit();
});

process.on('uncaughtException', function(err){
    if(err.msg){
        context.log.error(err.msg);
    } else {
        context.log.error(err);
    }
    context.database.close()
    process.exit();
});
