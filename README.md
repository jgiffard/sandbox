# 🛠️ Boîte à Outils - Utilitaires Web

Un site web statique moderne contenant une collection d'outils pratiques pour le développement et l'usage quotidien.

## ✨ Fonctionnalités

### 📝 Compteur de caractères
- Comptage en temps réel des caractères (avec et sans espaces)
- Comptage des mots et des lignes
- Interface responsive avec animations

### 📱 Générateur QR Code
- Génération de QR codes à partir de texte ou d'URLs
- Téléchargement direct au format PNG
- Personnalisation des couleurs

### 👤 Générateur de pseudo
- Génération de noms d'utilisateur prononcables
- Options configurables (chiffres, symboles)
- Longueur ajustable (4-20 caractères)

### 🧮 Calculatrice de pourcentages
- Calcul de X% de Y
- Détermination du pourcentage d'une valeur
- Calcul de variation en pourcentage avec indication visuelle

### 🔐 Générateur de mot de passe
- Génération sécurisée avec options configurables
- Indicateur de force du mot de passe
- Support des majuscules, minuscules, chiffres et symboles
- Longueur ajustable (8-50 caractères)

## 🚀 Utilisation

### Installation
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur web

### Raccourcis clavier
- `Ctrl + G` : Générer (dans les outils de génération)
- `Flèche gauche/droite` : Navigation entre les outils
- Copie en un clic avec les boutons 📋

## 🏗️ Structure du projet

```
.
├── index.html          # Page principale
├── css/
│   └── style.css      # Styles modernes et responsive
├── js/
│   └── main.js        # Logique JavaScript
└── README.md          # Documentation
```

## 🎨 Design

Le projet utilise un design moderne avec :
- **Palette de couleurs** : Indigo (#6366f1) comme couleur principale
- **Typographie** : Police Inter pour une lecture optimale
- **Layout** : CSS Grid et Flexbox pour la responsivité
- **Animations** : Transitions fluides et feedback visuel
- **Mobile-first** : Optimisé pour tous les types d'écrans

## 🔧 Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Variables CSS, Grid, Flexbox, animations
- **JavaScript ES6+** : Vanilla JS pour les interactions
- **QRCode.js** : Bibliothèque pour la génération de QR codes
- **Google Fonts** : Police Inter

## 📱 Responsive Design

Le site s'adapte automatiquement à :
- **Desktop** : Layout en colonnes avec navigation horizontale
- **Tablet** : Adaptation des grilles et espacement
- **Mobile** : Navigation verticale et interface tactile optimisée

## 🛡️ Sécurité

- Génération de mots de passe côté client uniquement
- Aucune donnée transmise vers des serveurs externes
- Code source ouvert et auditable

## 🎯 Fonctionnalités avancées

- **Animation des nombres** : Effet de comptage animé
- **Copie en un clic** : Feedback visuel lors de la copie
- **Validation en temps réel** : Calculs automatiques
- **Persistance visuelle** : États conservés pendant la navigation
- **Accessibilité** : Support clavier et éléments focusables

## 🔮 Extensions possibles

Voici quelques idées pour étendre le projet :

### Nouveaux outils
- Convertisseur d'unités (longueur, poids, température)
- Générateur de couleurs / palette
- Encodeur/décodeur Base64
- Formateur JSON/XML
- Générateur de Lorem Ipsum
- Calculatrice d'âge

### Améliorations
- Mode sombre/clair
- Sauvegarde des préférences (localStorage)
- Export des résultats en PDF
- Historique des générations
- Thèmes personnalisables

### Intégrations
- API de validation d'email
- Service de raccourcissement d'URL
- Intégration avec des services cloud

## 🏃‍♂️ Démarrage rapide

1. **Cloner le projet**
   ```bash
   git clone [URL_DU_REPO]
   cd boite-a-outils
   ```

2. **Lancer le projet**
   - Option 1 : Ouvrir `index.html` directement
   - Option 2 : Utiliser un serveur local
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js
   npx serve .
   
   # Avec PHP
   php -S localhost:8000
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:8000
   ```

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Optimiser le code

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation
- Vérifiez la compatibilité de votre navigateur

---

**Développé avec ❤️ pour la productivité au quotidien**
