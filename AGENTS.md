# Experts Nuisible — Direction du projet

Site vitrine pour une entreprise de désinsectisation et dératisation.

**Objectif principal : générer des appels et inspirer confiance, avec la qualité visuelle d'un site créé par une agence moderne.**

Ce document donne une direction, pas une liste de contraintes rigides. En cas de doute entre "suivre la règle à la lettre" et "améliorer le site", privilégier ce qui sert le mieux la conversion, la confiance et la qualité perçue.

## Le site doit être

- professionnel
- moderne
- premium
- rassurant
- rapide
- optimisé mobile

Inspiration : les standards de [Ryad Studio](https://ryadstudio.com) (interface moderne, propre, premium), les meilleurs sites d'entreprises locales modernes, une approche conversion forte.

## Ce qu'on évite

- un template classique d'artisan
- un site trop futuriste ou expérimental
- des animations qui n'apportent rien
- de la complexité juste pour impressionner

Ce ne sont pas des interdits absolus — un effet plus audacieux reste bienvenu s'il sert clairement l'expérience ou la conversion.

## Priorités

### 1. Conversion
- Le téléphone doit être visible rapidement.
- Les CTA d'appel sont prioritaires.
- L'utilisateur doit comprendre immédiatement le service proposé.
- Le site doit faciliter la prise de contact.

### 2. Confiance
Mettre en avant : professionnalisme, rapidité d'intervention, expertise, avis clients, réassurance.

### 3. Design
- excellente typographie
- beaucoup d'espace
- hiérarchie claire
- animations discrètes et élégantes
- transitions fluides
- sensation premium

## Navigation

- navbar moderne inspirée des sites d'agence
- logo à gauche
- navigation claire
- CTA téléphone visible
- menu hamburger propre sur mobile

## Architecture

Respecter l'architecture actuelle, en la faisant évoluer plutôt qu'en la contournant :

- `components/ui` — composants génériques réutilisables
- `components/layout` — Header, Footer, navigation
- `components/sections` — sections spécifiques au site
- `config/site.ts` — source unique pour toutes les informations de l'entreprise (téléphone, email, adresse, réseaux sociaux...)
- `data/` — contenu structuré

Ne jamais hardcoder les informations de l'entreprise (téléphone, email, adresse, réseaux sociaux) dans un composant : toujours passer par `config/site.ts`.

## Stack technique

Next.js App Router, React, TypeScript, Tailwind CSS v4.

## Code

- privilégier la simplicité et la qualité
- éviter la complexité inutile
- réutiliser les composants existants avant d'en créer de nouveaux
- garder un code propre et maintenable

## Animations

Utiliser les animations seulement si elles améliorent l'expérience utilisateur.

Privilégier Motion / Framer Motion pour les interactions UI, et des transitions CSS pour les effets simples. Les animations plus avancées restent possibles quand elles apportent une vraie valeur.

## SEO & performance

Le site doit être pensé pour une entreprise locale : structure SEO propre, performance, accessibilité, mobile first.

## Workflow

Avant une modification importante : expliquer quels fichiers vont être modifiés et pourquoi. Éviter de modifier des fichiers non nécessaires.

Toujours chercher à améliorer : expérience utilisateur, conversion, performance, qualité du code.
