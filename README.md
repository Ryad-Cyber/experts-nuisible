# Security Monitor

Outil de surveillance de surface d'exposition développé dans le cadre d'un stage en cybersécurité chez **Nethash**.

## Présentation

Ce projet automatise la surveillance d'une infrastructure en réalisant périodiquement des scans réseau et en détectant les changements au niveau des ports exposés.

Il intègre également une solution d'évaluation des vulnérabilités et un système d'alerting afin de faciliter le suivi des événements de sécurité.

## Fonctionnalités

* Automatisation de scans Nmap périodiques
* Détection des changements de ports ouverts
* Évaluation des vulnérabilités avec Greenbone Community Edition (GVM/OpenVAS)
* Analyse des résultats de scans
* Génération de rapports à partir des exports XML
* Envoi d'alertes par email
* Intégration de l'API iLert
* Vérification automatique du code avec GitHub Actions
* Packaging du projet Python

## Technologies

* Python
* Nmap
* Greenbone Community Edition (GVM/OpenVAS)
* Docker
* XML
* SMTP
* API REST / iLert
* GitHub Actions
* Git / GitHub

## Architecture générale

```text
             ┌──────────────┐
             │    Nmap      │
             └──────┬───────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Analyse des      │
          │ changements       │
          └────────┬──────────┘
                   │
                   ▼
          ┌───────────────────┐
          │     Alerting      │
          │ Email / iLert     │
          └───────────────────┘


        ┌─────────────────────┐
        │       GVM           │
        │     OpenVAS         │
        └──────────┬──────────┘
                   │
                   ▼
             XML / rapports
                   │
                   ▼
             Analyse Python
```

## Scénario de vulnérabilité

Le projet a notamment été utilisé avec **Metasploitable 2** comme cible de test pour l'évaluation des vulnérabilités.

Lors des scans, GVM a permis d'identifier de nombreuses vulnérabilités et CVE sur la machine cible.

## CI/CD

GitHub Actions est utilisé pour automatiser certaines vérifications du projet Python ainsi que son packaging.

## Objectif

Réduire les tâches manuelles liées à la surveillance de la surface d'exposition et permettre une détection plus rapide des changements et vulnérabilités observés sur les systèmes surveillés.

## Contexte

Projet réalisé dans le cadre d'un stage en cybersécurité chez **Nethash**, Paris.

## Auteur

**Ryad Boujenan**

GitHub : [Ryad-Cyber](https://github.com/Ryad-Cyber)
