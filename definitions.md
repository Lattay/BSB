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
    - thumbnail : chemin vers une miniature
    - path : chemin vers le fichier lui meme

# Features

## Coté utilisateur
- Parcours des fichiers sur la page d'acceuil

## Coté administrateur
- connexion sécurisé
- ajout, modification, suppression de documents
- ajout, suppression de tags

