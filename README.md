# 🌐 Social Portal — Czateria 2.0 + Datezone Hybrid  
**Nowoczesny portal społecznościowo‑randkowy z czatem w pokojach, feedem postów i systemem użytkowników.**

Social Portal to projekt łączący klimat dawnych czatów (Czateria, Interia Czat) z funkcjami współczesnych portali randkowych (Datezone, Badoo) oraz klasycznych serwisów społecznościowych.  
Aplikacja jest zbudowana w architekturze **full‑stack**: Node.js + Express + MongoDB (backend) oraz czysty HTML/CSS/JS (frontend).

---

# 📌 Funkcje projektu

## 🧑‍🤝‍🧑 **Użytkownicy**
- Rejestracja i logowanie (JWT)
- Haszowanie haseł (bcrypt)
- Dane profilu: nazwa, email, avatar (w przyszłości), opis, preferencje
- Token przechowywany w `localStorage`

---

## 📝 **Posty (feed społecznościowy)**
- Dodawanie postów
- Pobieranie feedu
- Lajkowanie postów
- Wyświetlanie autora i daty

---

## 💬 **Czat w pokojach (Czateria 2.0)**
- Lista pokoi (publiczne)
- Wejście do pokoju
- Wyświetlanie wiadomości
- Wysyłanie wiadomości (wymaga tokenu)
- Auto‑odświeżanie wiadomości
- Struktura gotowa pod WebSockety

---

## 🏠 **Pokoje czatowe**
- Model pokoju (nazwa, temat, prywatność)
- API do tworzenia i pobierania pokoi
- Możliwość rozbudowy o:
  - prywatne pokoje
  - pokoje 18+
  - pokoje lokalne (np. „Kalisz”)

---

## 🔐 **Bezpieczeństwo**
- JWT do autoryzacji
- Middleware `auth` chroniący endpointy
- Hasła szyfrowane bcryptem
- Oddzielone modele i trasy

---

# 🏗️ Architektura projektu

```
social-portal/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Room.js
│   │   └── Message.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   ├── rooms.js
│   │   └── messages.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── README.md
└── package.json
```

---

# ⚙️ Backend — technologie

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **CORS**
- **REST API**

---

# 🎨 Frontend — technologie

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- Fetch API
- Dynamiczne renderowanie UI

---

# 🚀 Uruchamianie projektu

## 1. Backend

Przejdź do folderu:

```
cd backend
```

Zainstaluj zależności:

```
npm install
```

Uruchom serwer:

```
node server.js
```

Serwer działa na:

```
http://localhost:5000
```

---

## 2. Frontend

Po prostu otwórz:

```
frontend/index.html
```

lub użyj Live Server.

---

# 🔌 API — dokumentacja skrócona

## 🔐 **Auth**
### POST `/api/register`
Rejestracja użytkownika.

### POST `/api/login`
Logowanie, zwraca token JWT.

---

## 📝 **Posty**
### GET `/api/posts`
Pobiera wszystkie posty.

### POST `/api/posts`
Dodaje post (wymaga tokenu).

### POST `/api/posts/:id/like`
Lajkuje post.

---

## 🏠 **Pokoje**
### GET `/api/rooms`
Lista pokoi.

### POST `/api/rooms`
Tworzy pokój.

---

## 💬 **Wiadomości**
### GET `/api/rooms/:id/messages`
Pobiera wiadomości z pokoju.

### POST `/api/rooms/:id/messages`
Wysyła wiadomość (wymaga tokenu).

---

# 🔮 Plan rozwoju (roadmap)

## ✔️ Etap 1 — Fundament (zrobione)
- Logowanie / rejestracja
- Posty
- Pokoje
- Wiadomości
- Czat w pokoju

## 🔜 Etap 2 — Funkcje społecznościowe
- Profile użytkowników
- Avatary
- Znajomi / obserwowanie
- Powiadomienia

## 🔜 Etap 3 — Funkcje randkowe (Datezone style)
- Dopasowania
- Filtry randkowe
- Weryfikacja selfie
- Tryb „Losowa osoba”

## 🔜 Etap 4 — Czat w czasie rzeczywistym
- WebSocket / Socket.io
- Lista użytkowników w pokoju
- Statusy „online / pisze…”

## 🔜 Etap 5 — Premium / monetyzacja
- Boost profilu
- Wyróżnienia
- Prezenty
- VIP w pokojach

---

# 🤝 Autor

**Patryk Sobierański**  
Projekt tworzony hobbystycznie jako nowoczesna hybryda:  
**Czateria 2.0 + Datezone + portal społecznościowy**.

---

# ⭐ Wsparcie

Jeśli projekt Ci się podoba — zostaw ⭐ na GitHubie.  
To pomaga rozwijać projekt i motywuje do dalszej pracy.

---
