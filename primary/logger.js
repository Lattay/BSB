module.exports = function(context){
    var logger = new Object;

    logger.info = function(msg){
        // Affiche des message informatifs
        console.log(msg);
    };
    logger.warning = function(msg){
        // Affiche des message d'alerte
        console.log('[WARN] ' + msg);
    };
    logger.error = function(msg, fatal=false){
        // Signale une erreur
        console.log('[ERR] ' + msg);
        if(fatal){
            throw msg;
        }
    };

    return logger;
};
