# SmartMove Backend

SmartMove backend predstavlja serverski deo sistema zadužen za upravljanje podacima, autentikaciju korisnika, rad sa vožnjama, lokacijama i profilima, kao i za izlaganje API interfejsa koji podržava funkcionalnosti prikazane na frontendu.

## Uloga backend dela

Backend obezbeđuje:

- prijavu i registraciju korisnika
- čuvanje i dohvat korisničkih podataka
- rad sa poznatim lokacijama
- listanje, pretragu i objavu vožnji
- osnovu za chat, recenzije, vozila, plaćanja i verifikacije
- Swagger dokumentaciju za pregled i demonstraciju API-ja

## Tehnologije

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- Zod
- Swagger UI
- Vitest + Supertest

## Struktura backend dela

- `src/app.ts` kreiranje Express aplikacije
- `src/server.ts` pokretanje servera
- `src/config/` konfiguracija okruženja
- `src/lib/` Prisma i pomoćne biblioteke
- `src/middlewares/` logger, autentikacija i obrada grešaka
- `src/modules/` moduli grupisani po funkcionalnim celinama
- `prisma/` šema baze i seed podaci
- `openapi/openapi.yaml` Swagger/OpenAPI specifikacija
- `docs/` tehnička i funkcionalna dokumentacija backend dela
- `tests/` testovi API-ja

## Funkcionalnosti backend-a

### Implementirane funkcionalnosti

- `auth` registracija, prijava i vraćanje trenutno prijavljenog korisnika
- `locations` lista i autocomplete lokacija
- `rides` listanje, pretraga i objava vožnji
- `profile` učitavanje osnovnih korisničkih podataka
- `health` provera statusa servera

### Definisane funkcionalne celine

Pored implementiranih modula, backend sadrži i dokumentovane rute za:

- inbox i poruke
- recenzije
- načine plaćanja
- vozila
- verifikacije
- izmenu profila

Ove rute imaju definisan ugovor, strukturu odgovora i mesto u arhitekturi sistema.

## Pokretanje backend-a

### 1. Instalacija zavisnosti

Iz foldera `backend/` pokrenuti:

```bash
npm install
```

### 2. Podešavanje okruženja

Napraviti `.env` fajl na osnovu `.env.example`.

Primer sadržaja:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=smartmove-demo-secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

### 3. Priprema baze

Pokrenuti:

```bash
npm run db:push
npm run db:seed
```

Prva komanda kreira i sinhronizuje SQLite bazu, a druga ubacuje početne podatke.

### 4. Startovanje servera

Za razvojni režim:

```bash
npm run dev
```

Za build:

```bash
npm run build
```

Za startovanje build verzije:

```bash
npm start
```

Backend je dostupan na `http://localhost:4000`.

## Swagger

Swagger služi kao centralno mesto za pregled backend API-ja.

- Swagger UI: `http://localhost:4000/api-docs`
- OpenAPI YAML: `http://localhost:4000/api-docs.yaml`
- OpenAPI JSON: `http://localhost:4000/api-docs.json`

Kroz Swagger se mogu videti:

- sve dostupne rute
- opis svake funkcionalnosti
- strukture zahteva
- strukture odgovora
- primeri API poziva

## Najvažnije rute

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/locations`
- `GET /api/v1/rides`
- `GET /api/v1/rides/search`
- `GET /api/v1/rides/:id`
- `POST /api/v1/rides`
- `GET /api/v1/profile/me`
- `PUT /api/v1/profile/me`
- `GET /api/v1/conversations`
- `GET /api/v1/conversations/:id/messages`
- `POST /api/v1/conversations/:id/messages`

## Testiranje

Pokretanje testova:

```bash
npm test
```

Testovi proveravaju:

- health endpoint
- Swagger dostupnost
- auth tokove
- pretragu i objavu vožnji
- strukturu odgovora dodatnih modula

## Dodatna dokumentacija

- [Arhitektura backend dela](./docs/architecture.md)
- [API pregled i mapiranje funkcionalnosti](./docs/api-overview.md)
- [Pregled cele aplikacije](../PROJECT_GUIDE.md)
- [Vodič za prezentaciju](../PRESENTATION_GUIDE.md)
