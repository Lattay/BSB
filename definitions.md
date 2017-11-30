# BDD

## Techno

On choisi SQLite, c'est petit, léger et embarqué, ça semble plus adapté au projet que MySQL/MariaDB.

## Structure des tables

- Document
    - id : identifiat unique
    - title : titre
    - description : description
    - type : type de fichier (pdf, html, image, video, audio)
    - date : date d'ajout
    - submiter : login de l'utilisateur ayant soumis le document
    - thumnail : chemin vers une miniature
    - path : chemin vers le fichier lui meme

A discuter :

- User
    - login : login d'un utilisateur admin
    - password : hash du mot de passe de l'utilisateur
    - ? avatar : chemin vers un avatar

# Features

## Coté utilisateur
- Parcours des fichiers sur la page d'acceuil

## Coté administrateur
- connexion sécurisé
- ajout, modification, suppression de documents
- ajout, suppression de tags

