# BDD

## Techno

On choisi SQLite, c'est petit, léger et embarqué, ça semble plus adapté au projet que MySQL/MariaDB.
On choisi également d'utiliser ejs pour construire les pages. En effet le petit nombre de pages se prette bien
à son utilisation.

## Structure des tables

- documents
    - id : identifiat unique
    - title : titre
    - description : description
    - type : type de fichier (pdf, html, image, video, audio)
    - date : date d'ajout
    - thumbnail : chemin vers une miniature
    - path : chemin vers le fichier lui meme

- password
    - login : identifiant unique, nom d'utilisateur
    - hash : représentation hashé du mot de passe
# Features

## Coté utilisateur
- Parcours des fichiers sur la page d'acceuil

## Coté administrateur
- connexion sécurisé
- ajout, modification, suppression de documents
- ajout, suppression de logins/mot de passe

