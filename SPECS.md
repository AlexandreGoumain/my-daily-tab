# My Daily Tab - Cahier des Charges

## 🎯 Vision du produit

**My Daily Tab** est une extension navigateur qui remplace la page "Nouvel onglet" par un **hub d'actualités tech personnalisable** basé sur des flux RSS, organisé par catégories thématiques.

**Positionnement** : Une alternative à daily.dev, plus légère, 100% customisable, sans compte obligatoire.

---

## 🏗️ Architecture fonctionnelle

```
┌────────────────────────────────────────────────────────────────┐
│                        MY DAILY TAB                            │
├────────────────────────────────────────────────────────────────┤
│  🔍 Recherche    │  ⏰ 14:32  │  🌤️ 18°C  │  ⚙️ Settings      │
├──────────────────┴────────────┴────────────┴───────────────────┤
│                                                                │
│  📁 Catégories: [Tout] [Web Dev] [AI/ML] [DevOps] [Custom +]   │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ 📰 Article  │ │ 📰 Article  │ │ 📰 Article  │               │
│  │ Source      │ │ Source      │ │ Source      │               │
│  │ il y a 2h   │ │ il y a 3h   │ │ il y a 5h   │               │
│  │ 🔖 ⭐       │ │ 🔖 ⭐       │ │ 🔖 ⭐       │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ 📰 Article  │ │ 📰 Article  │ │ 📰 Article  │               │
│  │  ...        │ │  ...        │ │  ...        │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  🔗 Raccourcis: [GitHub] [Stack] [ChatGPT] [+Ajouter]          │
└────────────────────────────────────────────────────────────────┘
```

---

## 📦 Fonctionnalités

### 1. 🗂️ Système de flux RSS par catégories

| Fonctionnalité | Description |
|----------------|-------------|
| **Catégories prédéfinies** | Templates avec flux RSS pré-configurés |
| **Catégories custom** | Créer ses propres catégories |
| **Ajout de flux** | Ajouter n'importe quel flux RSS à n'importe quelle catégorie |
| **Activer/Désactiver** | Toggle on/off pour chaque flux individuel |
| **Filtre par catégorie** | Afficher le feed d'une seule catégorie |
| **Vue "Tout"** | Feed combiné de toutes les catégories actives |

### 2. 📁 Catégories prédéfinies (templates)

| Catégorie | Sources suggérées |
|-----------|-------------------|
| 💻 **Web Development** | Dev.to, CSS-Tricks, Smashing Magazine, web.dev |
| 🤖 **AI & Machine Learning** | OpenAI Blog, HuggingFace, Google AI, Towards Data Science |
| ☁️ **DevOps & Cloud** | AWS Blog, Kubernetes Blog, HashiCorp, DigitalOcean |
| 📱 **Mobile Development** | Android Developers, Swift Blog, React Native Blog |
| 🔐 **Cybersecurity** | Krebs on Security, The Hacker News, OWASP |
| 🎮 **Game Development** | Gamasutra, Unity Blog, Unreal Engine |
| 🦀 **Rust** | This Week in Rust, Rust Blog |
| 🐍 **Python** | Real Python, Planet Python, PyBites |
| ⚡ **JavaScript** | JavaScript Weekly, Node Weekly, React Blog |
| 🐹 **Go** | Go Blog, Golang Weekly |
| 📰 **Tech News** | TechCrunch, The Verge, Ars Technica, Wired |
| 🇫🇷 **Tech FR** | Korben, Next INpact, Journal du Net, Numerama |
| 🚀 **Startups** | TechCrunch Startups, Product Hunt, Indie Hackers |
| 🎨 **Design & UX** | Smashing UX, UX Collective, Nielsen Norman |

### 3. 📰 Affichage des articles

| Fonctionnalité | Description |
|----------------|-------------|
| **Grille responsive** | Layout cards adaptatif |
| **Infos affichées** | Titre, source, date relative, image (si dispo) |
| **Bookmark** | Sauvegarder pour lire plus tard |
| **Favoris** | Marquer les articles importants |
| **Lu/Non-lu** | Tracking des articles consultés |
| **Ouvrir** | Nouvel onglet ou sidebar (option) |

### 4. 🔧 Widgets complémentaires

| Widget | Description |
|--------|-------------|
| ⏰ **Horloge** | Heure et date du jour |
| 🌤️ **Météo** | Météo locale (géoloc ou ville configurée) |
| 🔍 **Recherche** | Barre de recherche (Google, DuckDuckGo, custom) |
| 🔗 **Raccourcis** | Liens rapides personnalisables |
| ✅ **To-Do** | Liste de tâches simple (optionnel) |
| 💬 **Citation** | Citation dev/motivation du jour (optionnel) |

### 5. ⚙️ Paramètres

| Setting | Options |
|---------|---------|
| **Thème** | Light / Dark / System / Custom |
| **Layout** | Grille / Liste / Compact |
| **Refresh** | Fréquence de mise à jour des flux |
| **Widgets** | Activer/désactiver chaque widget |
| **Moteur recherche** | Google, DuckDuckGo, Bing, custom |
| **Import/Export** | Backup des configurations |

---

## 🛠️ Stack technique

| Couche | Techno |
|--------|--------|
| **Framework** | React 19 + TypeScript |
| **Build** | Vite |
| **State** | Zustand |
| **Storage** | Chrome Storage API / localStorage |
| **RSS Parsing** | rss-parser ou custom fetch + DOMParser |
| **Styling** | Tailwind CSS |
| **Extension API** | WebExtensions (Chrome + Firefox compatible) |

---

## 🎯 MVP (Version 1.0)

### Must have

- [ ] Structure extension navigateur (manifest.json)
- [ ] Page New Tab avec layout de base
- [ ] Système de catégories avec flux RSS
- [ ] 5-6 catégories prédéfinies avec flux
- [ ] Ajout/suppression de flux custom
- [ ] Création de catégories custom
- [ ] Filtre par catégorie
- [ ] Stockage local des préférences
- [ ] Dark/Light mode
- [ ] Horloge + Barre de recherche

### Nice to have (v1.1+)

- [ ] Météo
- [ ] Raccourcis personnalisés
- [ ] Bookmarks d'articles
- [ ] To-do list
- [ ] Sync entre appareils
- [ ] Import/Export config
- [ ] Support Firefox

---

## 📂 Structure projet

```
my-daily-tab/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Feed/
│   │   ├── CategoryTabs/
│   │   ├── ArticleCard/
│   │   ├── Widgets/
│   │   └── Settings/
│   ├── hooks/
│   │   ├── useRSSFeed.ts
│   │   ├── useCategories.ts
│   │   └── useStorage.ts
│   ├── services/
│   │   ├── rssParser.ts
│   │   └── storage.ts
│   ├── stores/
│   │   └── appStore.ts
│   ├── data/
│   │   └── defaultCategories.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── manifest.json
│   └── icons/
└── ...
```

---

## 📅 Historique

- **2025-12-27** : Création du cahier des charges initial
