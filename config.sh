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

# Génération de la configuration
cat <<EOF | sed "s?@LURL?$LURL?" | sed "s?@ROOT_PATH?$ROOT_PATH?g" | sed "s?@LPORT?$LPORT?" > $ROOT_PATH/myecl_config.json
{
    "port" : @LPORT,
    "url" : "@LURL",
    "root_path" : "@ROOT_PATH"
}
EOF

