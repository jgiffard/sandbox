# Cursor Rules Configuration

## 🆕 Nouveau Format MDC

Ce projet utilise le nouveau format **MDC** (Markdown Documentation for Code) pour les règles Cursor, qui remplace l'ancien système `.cursorrules`.

## 📁 Structure des Dossiers

```
.cursor/
├── rules/
│   ├── core-rules/          # Comportement Cursor et génération de règles
│   │   ├── web-development-standards-always.mdc
│   │   └── rule-generation-agent.mdc
│   ├── ui-rules/            # HTML, CSS, JavaScript, React
│   │   ├── html-standards-auto.mdc
│   │   ├── css-standards-auto.mdc
│   │   └── javascript-standards-auto.mdc
│   ├── global-rules/        # Standards globaux du projet
│   ├── testing-rules/       # Standards de test
│   ├── tool-rules/         # Git, CLI, outils MCP
│   ├── ts-rules/           # Règles TypeScript
│   └── py-rules/           # Règles Python
└── README.md
```

## ⚙️ Configuration Requise

Ajoutez cette configuration dans vos paramètres Cursor pour un éditeur optimal :

```json
"workbench.editorAssociations": {
  "*.mdc": "default"
}
```

Cela permet :
- ✅ Édition normale des fichiers `.mdc`
- ✅ Visualisation du frontmatter YAML
- ✅ Sauvegarde correcte des règles
- ✅ Pas de rendu UI qui cache le contenu

## 🔧 Types de Règles

### 1. Always (`-always.mdc`)
- **Usage** : Appliqué à chaque conversation
- **Frontmatter** : `alwaysApply: true`, description et globs vides
- **Exemple** : Standards globaux du projet

### 2. Auto-Attach (`-auto.mdc`)  
- **Usage** : Attaché automatiquement aux fichiers correspondants
- **Frontmatter** : `globs` définis, description vide, `alwaysApply: false`
- **Exemple** : Règles spécifiques aux fichiers JS/CSS/HTML

### 3. Agent-Selected (`-agent.mdc`)
- **Usage** : L'agent décide quand appliquer selon la description
- **Frontmatter** : `description` claire, globs vide, `alwaysApply: false`
- **Exemple** : Règles de refactoring, génération de code

### 4. Manual (`-manual.mdc`)
- **Usage** : Référencé explicitement avec @ ou liens markdown
- **Frontmatter** : Tous les champs vides sauf `alwaysApply: false`
- **Exemple** : Patterns avancés, règles spécialisées

## 📝 Format Frontmatter

Chaque fichier `.mdc` doit commencer par :

```yaml
---
description: [vide ou contenu selon le type]
globs: [patterns de fichiers ou vide]
alwaysApply: [true ou false]
---
```

## 🎯 Avantages du Nouveau Format

- **Organisation** : Structure claire en dossiers thématiques
- **Performance** : Chargement sélectif des règles
- **Flexibilité** : 4 types de règles pour différents usages
- **Maintenance** : Règles spécialisées et modulaires
- **Évolutivité** : Facile d'ajouter de nouvelles catégories

## 🔄 Migration depuis `.cursorrules`

L'ancien fichier `.cursorrules` a été décomposé en :

1. **Règles toujours actives** → `core-rules/*-always.mdc`
2. **Règles par type de fichier** → `ui-rules/*-auto.mdc`
3. **Règles contextuelles** → `core-rules/*-agent.mdc`
4. **Règles spécialisées** → `*/*-manual.mdc`

## 📚 Guides d'Utilisation

### Créer une Nouvelle Règle
1. Déterminer le type de règle nécessaire
2. Choisir le dossier approprié
3. Nommer le fichier : `{nom}-{type}.mdc`
4. Ajouter le frontmatter correct
5. Écrire le contenu de la règle

### Exemples de Patterns Globs
- HTML : `*.html, **/*.html`
- JavaScript : `*.js, **/*.js`
- TypeScript : `*.ts, *.tsx, **/*.ts, **/*.tsx`
- Tests : `**/*.test.js, **/*.spec.ts`
- Composants : `src/components/**/*.tsx`

## 🛠️ Maintenance

- Les règles sont chargées au début de chaque conversation
- Utilisez Command+N pour une nouvelle conversation avec les règles mises à jour
- Testez les règles dans différents contextes
- Supprimez les règles devenues obsolètes
- Consolidez les règles similaires si nécessaire

## 🔍 Débogage

Si une règle ne fonctionne pas :
1. Vérifiez le frontmatter (syntaxe YAML correcte)
2. Confirmez que le fichier se termine par `.mdc`
3. Vérifiez que le fichier est dans `.cursor/rules/`
4. Redémarrez la conversation (Command+N)
5. Testez avec la configuration d'éditeur recommandée

---

**Note** : Ce système de règles évolue constamment avec Cursor. Cette documentation sera mise à jour selon les changements de l'IDE.