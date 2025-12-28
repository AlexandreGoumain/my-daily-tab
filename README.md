# My Daily Tab

Une extension navigateur qui remplace la page "Nouvel onglet" par un hub d'actualités tech personnalisable basé sur des flux RSS.

**Alternative à daily.dev** - Plus légère, 100% customisable, sans compte obligatoire.

## Fonctionnalités

- **Flux RSS par catégories** - 14 catégories prédéfinies (Web Dev, AI/ML, DevOps, etc.)
- **Personnalisation totale** - Ajouter/supprimer des flux, créer ses propres catégories
- **Filtrage par catégorie** - Voir tous les articles ou filtrer par thématique
- **Dark/Light mode** - Thème adaptatif selon les préférences système
- **Barre de recherche** - Google, DuckDuckGo ou Bing
- **Raccourcis personnalisables** - Accès rapide à vos sites favoris
- **Bookmarks & Favoris** - Sauvegarder les articles importants
- **Stockage local** - Toutes les données restent sur votre machine

## Stack technique

| Techno | Usage |
|--------|-------|
| React 19 | UI Framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS 4 | Styling |
| Zustand | State management |
| Chrome Extension Manifest V3 | Extension API |

## Installation

```bash
# Cloner le repo
git clone https://github.com/AlexandreGoumain/my-daily-tab.git
cd my-daily-tab

# Installer les dépendances
npm install
```

## Développement

```bash
# Lancer le serveur de dev
npm run dev

# Ouvrir http://localhost:5173
```

## Build de l'extension

```bash
# Builder l'extension Chrome
npm run build:extension
```

Le dossier `dist/` contient l'extension prête à être chargée.

### Charger dans Chrome

1. Ouvrir `chrome://extensions`
2. Activer le **Mode développeur** (toggle en haut à droite)
3. Cliquer **Charger l'extension non empaquetée**
4. Sélectionner le dossier `dist/`
5. Ouvrir un nouvel onglet pour tester

## Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run build:extension` | Build + copie du manifest |
| `npm run lint` | Vérification ESLint |
| `npm run preview` | Prévisualiser le build |

## Structure du projet

```
src/
├── components/
│   ├── Header/          # Logo, SearchBar, Clock
│   ├── CategoryTabs/    # Filtrage par catégorie
│   ├── Feed/            # Liste des articles
│   ├── ArticleCard/     # Carte article
│   ├── Shortcuts/       # Raccourcis rapides
│   └── Widgets/         # Clock, etc.
├── data/
│   └── defaultCategories.ts   # Catégories prédéfinies
├── services/
│   ├── rssParser.ts     # Parser RSS/Atom
│   └── storage.ts       # Persistance localStorage
├── stores/
│   └── appStore.ts      # State Zustand
├── types/
│   └── index.ts         # Types TypeScript
└── App.tsx
```

## Catégories prédéfinies

| Catégorie | Sources |
|-----------|---------|
| Web Development | Dev.to, CSS-Tricks, Smashing Magazine, web.dev |
| AI & Machine Learning | OpenAI Blog, Hugging Face, MIT AI News |
| DevOps & Cloud | Kubernetes Blog, DigitalOcean, HashiCorp |
| JavaScript | JavaScript Weekly, React Blog |
| Tech News | TechCrunch, The Verge, Ars Technica |
| Tech FR | Korben, Next INpact, Numerama |
| ... | Et plus encore ! |

## Roadmap

- [ ] Modal de gestion des catégories
- [ ] Ajout de flux RSS personnalisés
- [ ] Widget météo
- [ ] Import/Export de configuration
- [ ] Support Firefox
- [ ] Sync entre appareils

## Licence

MIT
