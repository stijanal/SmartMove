# SmartMove - pregled aplikacije

## Šta je SmartMove

SmartMove je platforma namenjena organizaciji putovanja i povezivanju korisnika koji žele da:

- pronađu prevoz između dve lokacije
- podele vožnju sa drugim korisnicima
- objave slobodna mesta u svom vozilu
- komuniciraju pre potvrde i realizacije putovanja
- vode pregled svojih vožnji, ocena i osnovnih podataka

Glavna vrednost aplikacije je objedinjavanje više procesa u jedinstveno iskustvo. Korisnik ne mora da koristi odvojene kanale za pretragu prevoza, komunikaciju sa vozačem i pregled istorije svojih aktivnosti, već sve može da uradi unutar jednog sistema.

## Poslovna ideja aplikacije

SmartMove je zamišljen kao rešenje za korisnike koji žele fleksibilnije planiranje putovanja u odnosu na klasične modele prevoza. Aplikacija kombinuje elemente:

- carpooling pristupa, gde vozači nude slobodna mesta
- pametne pretrage, gde se korisniku prikazuju isplative opcije
- direktne komunikacije između učesnika vožnje
- korisničkih profila koji povećavaju poverenje kroz rejtinge i verifikacije

Time aplikacija pokušava da odgovori na tri ključna problema:

1. Pronalaženje odgovarajuće vožnje često je neorganizovano i rasuto po više kanala.
2. Korisnici nemaju jasan pregled različitih opcija prevoza na jednom mestu.
3. Poverenje između vozača i putnika je teško izgraditi bez jasnog profila, istorije i komunikacije.

## Ciljna upotreba

Tipičan scenario je sledeći:

1. Korisnik unosi polazište, odredište, datum i broj putnika.
2. Sistem prikazuje relevantne opcije vožnji i preporučene ponude.
3. Korisnik pregledava detalje vožnje i kontaktira vozača.
4. Nakon dogovora, korisnik prati komunikaciju kroz inbox.
5. Vozač po potrebi objavljuje novu vožnju i upravlja osnovnim podacima o sebi i vozilu.

## Frontend deo

Frontend predstavlja vizuelni prototip korisničkog iskustva i prikazuje glavne funkcionalne celine sistema.

### Ekran za autentikaciju

Početni ekran obuhvata:

- prijavu korisnika
- otvaranje forme za registraciju
- unos osnovnih podataka pri kreiranju naloga

Ovaj deo ilustruje ulaznu tačku sistema i osnovnu identifikaciju korisnika.

### Početni ekran za pretragu

Nakon prijave korisnik dolazi na ekran za pretragu, gde bira:

- mesto polaska
- odredište
- datum
- broj putnika

Ovde se vidi osnovna vrednost aplikacije: brzo pokretanje procesa planiranja putovanja.

### Rezultati pretrage

Ekran rezultata prikazuje:

- preporučene opcije prevoza
- listu slobodnih vožnji
- osnovne filtere kao što su cena i rejting vozača

Ovaj deo demonstrira kako korisnik dobija pregled ponuda i bira najpogodniju opciju.

### Inbox i chat

Frontend sadrži prikaz:

- liste razgovora
- aktivnog razgovora
- toka poruka između putnika i vozača

Time je predstavljena komunikaciona komponenta bez koje koordinacija vožnje ne bi bila potpuna.

### Profil korisnika

Profil objedinjuje više podataka o korisniku:

- lične informacije
- istoriju putovanja
- recenzije
- načine plaćanja
- podatke o vozilu
- status verifikacije

Profil je važan jer uvodi transparentnost i osećaj poverenja između korisnika.

### Objavljivanje vožnje

Poseban ekran omogućava vozaču da unese:

- polazište
- odredište
- datum i vreme
- broj mesta
- cenu

Na ovaj način frontend prikazuje i drugu stranu sistema, odnosno ponašanje korisnika koji nudi prevoz.

## Backend deo

Backend je zadužen za servisnu logiku, čuvanje podataka i izlaganje API interfejsa koji podržava funkcionalnosti predstavljene na frontendu.

### Uloga backend-a

Backend omogućava:

- autentikaciju korisnika
- čuvanje i dohvat korisničkih podataka
- rad sa lokacijama i vožnjama
- definisanje ugovora za chat, recenzije, plaćanja i verifikacije
- dokumentovanje svih API ruta kroz Swagger

### Glavni domeni sistema

- `auth` upravlja registracijom, prijavom i identitetom korisnika
- `locations` služi za pretragu i autocomplete lokacija
- `rides` pokriva listanje, pretragu i objavu vožnji
- `profile` vraća osnovne profilne podatke
- `chat`, `reviews`, `payments`, `vehicles`, `verifications` predstavljaju zasebne domene predviđene za dalje proširenje

### Podaci i modeli

Backend trenutno koristi sledeće osnovne modele:

- korisnik
- lokacija
- vožnja

Ovi modeli pokrivaju minimalan skup podataka potreban da se demonstrira rad sistema.

### API i Swagger

Swagger dokumentacija omogućava da se:

- pregledaju sve dostupne rute
- vide request i response strukture
- prikaže način komunikacije između frontend i backend sloja

To je posebno korisno tokom prezentacije, jer omogućava jasan i vizuelan prikaz sistema na nivou API-ja.

## Tehnološki pregled

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- Swagger UI

## Zaključak

SmartMove je osmišljen kao sistem koji objedinjuje pretragu prevoza, objavu vožnji, komunikaciju i upravljanje korisničkim profilom. Frontend prikazuje korisničke tokove i iskustvo rada sa aplikacijom, dok backend obezbeđuje servisnu logiku, podatke i API sloj potreban za dalje širenje sistema.
