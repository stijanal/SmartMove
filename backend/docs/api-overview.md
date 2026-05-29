# API pregled i mapiranje funkcionalnosti

## Uloga API sloja

API sloj predstavlja vezu između frontend i backend dela sistema. Frontend definiše korisničke tokove i način interakcije, dok backend preko API-ja obezbeđuje podatke i logiku potrebnu za realizaciju tih tokova.

## Glavne funkcionalne oblasti

Na osnovu postojećeg interfejsa izdvojene su sledeće oblasti:

- autentikacija korisnika
- pretraga lokacija
- pretraga i pregled vožnji
- objava vožnje
- pregled profila
- komunikacija između korisnika
- pregled recenzija, vozila, plaćanja i verifikacija

## Mapiranje frontend ekrana na API rute

### 1. Login i registracija

Frontend obuhvata formu za prijavu i modal za registraciju. Ove celine su mapirane na sledeće rute:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

Namena:

- kreiranje naloga
- autentikacija korisnika
- učitavanje podataka o trenutno aktivnom korisniku

### 2. Pretraga putovanja

Početni ekran omogućava izbor polazišta, odredišta, datuma i broja putnika. Ovaj deo koristi:

- `GET /api/v1/locations`
- `GET /api/v1/rides/search`
- `GET /api/v1/rides`

Namena:

- autocomplete lokacija
- filtriranje dostupnih vožnji
- prikaz svih ili odabranih rezultata

### 3. Detalji vožnje

Kada korisnik želi više informacija o određenoj vožnji koristi se:

- `GET /api/v1/rides/:id`

Namena:

- prikaz detalja izabrane vožnje
- prikaz podataka o vozaču, ceni, lokacijama i dostupnim mestima

### 4. Objavljivanje vožnje

Forma za objavu vožnje mapirana je na:

- `POST /api/v1/rides`

Namena:

- unos nove vožnje u sistem
- čuvanje podataka o relaciji, vremenu, broju mesta i ceni

### 5. Profil korisnika

Korisnički profil koristi:

- `GET /api/v1/profile/me`
- `PUT /api/v1/profile/me`

Namena:

- prikaz osnovnih korisničkih podataka
- definisanje ugovora za eventualnu izmenu profila

### 6. Inbox i chat

Chat deo frontend-a povezan je sa sledećim rutama:

- `GET /api/v1/conversations`
- `GET /api/v1/conversations/:id/messages`
- `POST /api/v1/conversations/:id/messages`

Namena:

- prikaz liste razgovora
- učitavanje poruka u jednom razgovoru
- slanje nove poruke

### 7. Dodatne profilne sekcije

Sekcije za recenzije, plaćanja, vozilo i verifikacije imaju sledeće rute:

- `GET /api/v1/reviews/me`
- `GET /api/v1/payments/methods`
- `GET /api/v1/vehicles/me`
- `PUT /api/v1/vehicles/me`
- `GET /api/v1/verifications/me`

Namena:

- pregled reputacije korisnika
- pregled metoda plaćanja
- pregled i izmena podataka o vozilu
- pregled statusa verifikacije

## Standard API odgovora

Sve rute koriste zajednički format odgovora:

```json
{
  "success": true,
  "message": "Opis operacije",
  "data": {},
  "meta": {}
}
```

Prednost ovog pristupa je u tome što frontend na svim mestima može da očekuje istu strukturu odgovora.

## Uloga stub ruta

Za funkcionalnosti koje nisu do kraja razrađene definisane su rute sa jasnim odgovorima i primerima podataka. Na taj način:

- API ostaje konzistentan
- arhitektura ostaje kompletna
- moguće je prikazati ceo sistem na nivou integracija

Kod takvih ruta koristi se `meta.mock = true` kao jasan indikator da je odgovor demonstracionog karaktera.

## Kako koristiti ovaj dokument tokom prezentacije

Ovaj dokument je koristan kada treba povezati konkretan ekran sa odgovarajućom backend funkcionalnošću. Najpraktičniji pristup je:

1. Pokazati ekran na frontendu.
2. Objasniti koju korisničku potrebu taj ekran rešava.
3. Navesti rute koje backend koristi za podršku tom ekranu.
4. Po potrebi otvoriti istu rutu u Swagger prikazu.
