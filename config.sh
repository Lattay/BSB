#!/bin/bash
# Initialise la configuration par défaut de BSB

ask(){
    echo -n "$1 [$2] : "
    read $3
    if [[ -z ${!3} ]]
    then
        eval $3="$2"
    fi
}

ask "URL d'écoute ?" "localhost" LURL
ask "Port d'écoute ?" "8080" LPORT
ask "Chemin vers la racine ?" "$(pwd)" ROOT_PATH

# Mise à jour des modules node.js
npm install --build-from-source

ask "Initialiser la base de données ? [o/N]" "N" INIT_DB
if [[ $INIT_DB != "O" -a $INIT_DB != "o" ]]
then
    sqlite bsb.sqlite < init_db.sql
fi

# Génération de la configuration
cat <<EOF | sed "s?@LURL?$LURL?" | sed "s?@ROOT_PATH?$ROOT_PATH?g" | sed "s?@LPORT?$LPORT?" > $ROOT_PATH/bsb.json
{
    "port" : @LPORT,
    "url" : "@LURL",
    "root_path" : "@ROOT_PATH",
    "database" : "bsb.sqlite",
    "default_static_options" : {
        "index" : false,
        "redirect" : false
    },
    "session_config" : {
        "secret" : "14feab574fcec7ddf15935e7bd19c12345aa5c6b80fe44b1ef344d8e14645ec5",
        "resave" : false,
        "saveUninitialized" : true
    }
}
EOF

