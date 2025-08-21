# 🛠️ Vinted Backend

Backend du projet **Vinted Clone**, une API REST construite avec **Node.js** et **Express** pour gérer l’authentification, la publication d’annonces, les paiements et la communication avec le frontend.

## 🚀 Fonctionnalités principales

- 🔑 Authentification des utilisateurs (inscription / connexion avec sécurisation du mot de passe).  
- 📦 Gestion des offres (création, récupération, filtrage).  
- 💳 Intégration du paiement via **Stripe**.  
- 🖼️ Upload et hébergement d’images avec **Cloudinary**.  
- 🗄️ Stockage des données dans **MongoDB**.  
- 🌍 API consommée par le projet [Vinted Frontend](https://github.com/PriscilH/Vinted-front).  

## 🧰 Technologies utilisées

- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MongoDB + Mongoose](https://mongoosejs.com/)  
- [Cloudinary](https://cloudinary.com/) (upload d’images)  
- [Stripe](https://stripe.com/) (paiement en ligne)  
- [dotenv](https://github.com/motdotla/dotenv) (gestion des variables d’environnement)  
- [cors](https://github.com/expressjs/cors)  

## 📂 Structure du projet

```bash
Vinted-Backend/
│── index.js # Point d’entrée du serveur
│── package.json # Dépendances et scripts
│── .env.example # Variables d’environnement (exemple)
│── /routes # Routes API (auth, offers, payment…)
│── /models # Schémas Mongoose
│── /middlewares # Middlewares (authentification, gestion erreurs…)
```

## ⚙️ Installation & démarrage

1. **Cloner le repo**  
```bash
git clone https://github.com/PriscilH/Vinted-Backend.git
cd Vinted-Backend
```

2. **Installer les dépendances**  
```bash
npm install
```

3. **Configurer les variables d’environnement**  
Créer un fichier .env à la racine (voir .env.example) avec :

```bash
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_key
STRIPE_SECRET_KEY=your_stripe_key
```

4. **Lancer le serveur**  
```bash
npm start
```
Par défaut, le serveur tourne sur :
👉 http://localhost:4000

## 🔗 Endpoints principaux

| Méthode | Endpoint          | Description                        |
|---------|-------------------|------------------------------------|
| POST    | `/user/signup`    | Inscription utilisateur             |
| POST    | `/user/login`     | Connexion utilisateur               |
| GET     | `/offers`         | Récupérer la liste des offres       |
| POST    | `/offer/publish`  | Publier une nouvelle offre          |
| POST    | `/payment`        | Effectuer un paiement avec Stripe   |
