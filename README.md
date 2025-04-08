# 🍪 SweetCookie - Site E-commerce de Cookies  

SweetCookie est un site e-commerce dédié à la vente de cookies artisanaux. Il permet aux utilisateurs de naviguer parmi une sélection de cookies, de créer un compte, de gérer leur profil et d'acheter leurs gourmandises préférées.  

Développé dans le cadre du projet **DWWM**, ce site utilise une **architecture MVC** et intègre les technologies **Node.js**, **Express**, **Sequelize** pour le backend, et **React** pour le frontend.  

---

## 🚀 Fonctionnalités principales  

### 🔐 **Authentification & Sécurité**  
- Inscription et connexion sécurisées avec **bcrypt** (hachage des mots de passe) et **JWT** (gestion des tokens d'authentification).  
- Gestion des rôles (utilisateurs, administrateurs).  
- Sécurisation des routes backend avec des middlewares.  

### 👤 **Gestion des utilisateurs et profils**  
- Création, modification et suppression des comptes utilisateurs.  
- Mise à jour des informations de profil.    

### 🛒 **Gestion du panier**  
- Ajout, modification et suppression des articles du panier.  
- Calcul du total de la commande en fonction des articles sélectionnés.  
- Sauvegarde du panier pour des utilisateurs.  

### 🍪 **Gestion des produits (cookies)**  
- Affichage dynamique des produits disponibles via une **API REST**.  
- Mise en avant des cookies populaires et des promotions.

### ❤️ **Système de favoris**  
- Ajout et suppression des produits en favoris.  
- Affichage d'une liste des cookies préférés par l'utilisateur.  

### 💳 **Passage de commande**  
- Simulation d’un paiement.  
- Validation et enregistrement des commandes.  
- Historique et suivi des commandes disponibles pour chaque utilisateur.  

### 🛠 **Autres fonctionnalités**  
- **Animations & Expérience utilisateur** : Intégration de **AOS.js** pour les animations au défilement.  
- **Accessibilité & Responsiveness** : Site responsive et accessible sur mobile et tablette.  

---

## 🏗️ Technologies utilisées  

| Technologie | Description |
|------------|------------|
| **React.js + Vite.js** | Interface utilisateur dynamique et réactive. |
| **Node.js & Express** | Gestion des routes et de l'API REST. |
| **Sequelize & MySQL** | ORM et gestion de la base de données relationnelle. |
| **JWT & bcrypt** | Sécurisation de l’authentification. |
| **Axios** | Gestion des requêtes HTTP côté client. |
| **AOS.js** | Effets d’animation au scroll. |


#### 📌 À venir :
- Espace administrateur.


## 📸 Aperçu
<img src="https://github.com/user-attachments/assets/3c502b2c-2369-4127-a1a4-b005c6f6c66d" alt="Home page" width="1000"/>
<img src="https://github.com/user-attachments/assets/d7141ea4-d22d-4769-8a07-ad0f658be5c9" alt="Commande en cours" width="1000"/>
<img src="https://github.com/user-attachments/assets/1e1ce7e3-7a53-4ec6-9335-f7eec746563e" alt="Suivi de commande" width="1000"/>

---

## ⚙️ Installation et configuration  

1️⃣ **Cloner le projet** 
```bash
git clone https://github.com/CasabMb/Sweet_Cookies.git



