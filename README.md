Project Sklep

Prosta aplikacja webowa typu CRUD stworzona z wykorzystaniem Node.js (Express), MySQL oraz JavaScript.
Projekt został wykonany w ramach zadania uczelnianego.

Funkcjonalności

Dodawanie, edytowanie, usuwanie i wyświetlanie produktów

REST API oparte na Express

Relacyjna baza danych MySQL

Prosty interfejs frontendowy z walidacją formularzy

Pełna obsługa operacji CRUD od początku do końca

Technologie

Node.js / Express

MySQL / Sequelize ORM

HTML / CSS / JavaScript (frontend)

Bootstrap (stylizacja interfejsu)

Struktura projektu
project-sklep/
│
├── public/              # Pliki statyczne (CSS, JS, obrazy)
│   ├── style.css
│   └── script.js
│
├── routes/              # Definicje tras (np. obsługa produktów)
│   └── productRoutes.js
│
├── views/               # Szablony HTML (jeśli używane)
│   └── index.html
│
├── models/              # Definicje modeli Sequelize
│   └── Product.js
│
├── config/              # Pliki konfiguracyjne (np. połączenie z bazą danych)
│   └── config.js
│
├── server.js            # Główny plik serwera Express
├── package.json         # Informacje o projekcie i zależnościach
└── README.md            # Dokumentacja projektu

Instalacja i uruchomienie

Sklonuj repozytorium:
git clone https://github.com/Aliaks1/project-sklep.git

Przejdź do katalogu projektu:
cd project-sklep

Zainstaluj zależności:
npm install

Utwórz bazę danych MySQL i skonfiguruj połączenie w pliku config/config.js lub .env.

Uruchom serwer:
node server.js

Otwórz aplikację w przeglądarce:
http://localhost:3000
