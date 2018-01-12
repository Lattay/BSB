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

if [ "$1" != "prod" ]
then
    ask "URL d'écoute ?" "localhost" LURL
    ask "Port d'écoute ?" "8080" LPORT
    ask "Chemin vers la racine ?" "$(pwd)" ROOT_PATH
    ask "Initialiser la base de données ? [o/N]" "N" INIT_DB
else
    LURL=localhost
    LPORT=8080
    ROOT_PATH=$(pwd)
    INIT_DB="o"
fi

# Mise à jour des modules node.js
npm install --build-from-source


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
    },
    "no_thumb" : "/pictures/no_thumb.png"
}
EOF

if [ "$INIT_DB" == "O" -o "$INIT_DB" == "o" ]
then
    echo Initialisation des bases de données.
    cat init_db.sql | sqlite3 bsb.sqlite
    echo Initialisation d\'un mot de passe administrateur.
    node init_password.js
fi
