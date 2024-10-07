# ImpactFamilleProjectAng

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.
 Il utilise json-server version  0.17.4 et json-server-auth version 2.1.0


## Description

Ce projet d'administration des bénévoles contient trois types d'utilisateurs(Bénévole, client et directeur). Le bénévole s'occupe de la gestion des utilisateurs, le directeur s'occupe de la gestion des boites et des produits et l'objectif du client, c'est de s'enregistrer et de commander son chariot qui contient plusieurs produits sachant que toout le monde aura les mêmes produits avec une quantité égale pour tout le monde. Il a le droit de supprimer un produit de son panier s'il le désire. Finalement, ce programme contient aussi un chat avec un bot en besoin d'aide. 
 

## Démarrer le projet

Utiliser chaque commande dans différents powershell pour que le programme angular fonctionne efficacement:
    ![Capture d’écran 2024-06-05 150333](https://github.com/GitGenius212/impact_famille_project/assets/130074651/08d40f2c-5f38-457a-bc1b-a2f4977ffc35)



Pour typescript locale:

    npx json-server data/user_db.json -m ./node_modules/json-server-auth -r routes.json -p 8090 -H 0.0.0.0

    npx json-server -w data/produit_db.json -p 8088 -H 0.0.0.0

    npx json-server -w data/boite_db.json -p 8089 -H 0.0.0.0

Pour  typescript gobale:

    json-server data/user_db.json -m ./node_modules/json-server-auth -r routes.json -p 8090 -H 0.0.0.0

    json-server -w data/produit_db.json -p 8088 -H 0.0.0.0

    json-server -w data/boite_db.json -p 8089 -H 0.0.0.0

Démarrer

    ng serve --port 4100  --open

## Notes :
 Pour pouvoir tester le projet, vous trouverais les mots de passe et les emails  des différents type d'utilisateurs dans ce chemin:
 
     src/app/http/add_user_db.http
     
 Vous pourrez tester avec un directeur : 
 email : achraf@impact.com
 password : achraf12

    
