# Veille stratégique SODEXAM (version GitHub Pages)

Application de veille du Directeur Général : aéroportuaire, aéronautique, météorologie et médecine aéronautique, sur trois zones (Côte d'Ivoire, Afrique, monde).

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application. Elle contient aussi une copie des données, pour s'afficher même si `data.json` manque. |
| `data.json` | Les articles et la synthèse du jour. C'est le seul fichier à remplacer pour mettre la veille à jour. |
| `sw.js` | Garde l'application et les données sur l'appareil pour la lecture hors ligne. |
| `manifest.webmanifest`, `icon-192.png`, `icon-512.png` | Permettent d'ajouter l'application à l'écran d'accueil du téléphone. |

## Mise en ligne

1. Déposer les six fichiers à la racine d'un dépôt GitHub.
2. Settings > Pages > Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. L'adresse s'affiche après une à deux minutes.

Sur téléphone : ouvrir l'adresse, puis « Ajouter à l'écran d'accueil » (Safari : bouton Partager ; Chrome : menu).

## Mise à jour des données

Remplacer `data.json` par une version plus récente. L'application relit ce fichier à l'ouverture, au retour sur l'onglet et toutes les cinq minutes. Les nouveaux articles critiques, et ceux qui contiennent un mot surveillé, déclenchent une alerte.

Format attendu :

```json
{
 "exporte": "2026-10-26T11:28:00Z",
 "briefing": { "date": "2026-10-26", "genereLe": "…", "derniereCollecte": "…", "prochaineCollecte": "…",
               "points": [ { "texte": "…", "ids": ["id-article"] } ] },
 "items": [ { "id": "…", "titre": "…", "date": "AAAA-MM-JJ",
              "secteur": "aeroportuaire|aeronautique|meteorologie|medecine",
              "zone": "ci|afrique|monde", "priorite": "critique|haute|veille",
              "source": "…", "url": "…", "resume": "…", "sodexam": "…", "motscles": ["…"], "ajoute": "…" } ]
}
```

Après une modification de `index.html`, changer la valeur `VERSION` en tête de `sw.js` pour que les téléphones chargent la nouvelle version.

## Différences avec la version claude.ai

- Pas de note express ni de questions à l'IA : ces fonctions ne marchent qu'à l'intérieur de claude.ai.
- Articles lus, suivis et mots surveillés sont gardés sur chaque appareil, sans synchronisation.

## Avertissement

Un site GitHub Pages est public, même quand le dépôt est privé, sauf avec GitHub Enterprise Cloud et une visibilité restreinte. La balise `noindex` évite le référencement par les moteurs de recherche, mais toute personne qui a l'adresse peut ouvrir la page. Ne pas y publier de contenu interne sans cette protection.
