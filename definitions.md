# BDD

## Techno

On choisi SQLite, c'est petit, léger et embarqué, ça semble plus adapté au projet que MySQL/MariaDB.

## Structure des tables

- Document
    - id : identifiat unique
    - title : titre
    - description : description
    - date : date d'ajout
    - submiter : login de l'utilisateur ayant soumis le document
    - ? thumnail : chemin vers une miniature
    - path : chemin vers le fichier lui meme

- Tag
    - id : identifiant unique
    - tag : nom du tag / mot clé

- Tagged
    - idT : identifiant d'un tag
    - idD : identifiant d'un document

- User
    - login : login d'un utilisateur admin
    - password : hash du mot de passe de l'utilisateur
    - ? avatar : chemin vers un avatar

# Features

## Coté utilisateur
- Parcours des fichiers dès qu'il ouvre un navigateur
- recherche / tri par mot clé
- ? recherche dans le titre
- ? recherche dans la description

## Coté administrateur
- connexion sécurisé
- ajout / suppression de documents
- ajout / suppression de tags

