# SmartMove - vodič za prezentaciju

## Svrha dokumenta

Ovaj dokument služi kao pomagalo tokom prezentacije i daje jasan redosled tema, objašnjenja funkcionalnosti i predlog kako da se projekat predstavi kroz frontend i backend deo.

## Kako započeti prezentaciju

Preporučeni uvod:

1. Predstaviti problem koji aplikacija rešava.
2. Objasniti osnovnu ideju SmartMove sistema.
3. Pokazati kako je aplikacija podeljena na frontend i backend deo.

Primer uvodne poruke:

SmartMove je aplikacija za organizaciju putovanja i povezivanje putnika i vozača. Cilj sistema je da korisnicima omogući jednostavnu pretragu vožnji, objavu slobodnih mesta, komunikaciju i pregled profila na jednom mestu.

## Problem koji aplikacija rešava

Tokom prezentacije naglasiti sledeće:

- korisnici često nemaju jedinstveno mesto za pronalazak vožnji
- komunikacija između vozača i putnika je često van sistema
- ne postoji uvek jasan pregled profila, istorije i poverenja između korisnika

SmartMove uvodi jedinstven tok rada u kome su pretraga, komunikacija i pregled podataka objedinjeni.

## Kako predstaviti frontend deo

Frontend je pogodan za predstavljanje korisničkog iskustva i osnovnih funkcionalnih tokova.

### 1. Prijava i registracija

Naglasiti da aplikacija počinje autentikacijom korisnika. Pokazati:

- login formu
- modal za registraciju
- unos osnovnih podataka korisnika

Poruka za prezentaciju:

Ovde korisnik prvi put ulazi u sistem i kreira svoj identitet unutar platforme.

### 2. Početna pretraga vožnji

Pokazati formu sa poljima:

- mesto polaska
- odredište
- datum
- broj putnika

Poruka za prezentaciju:

Ovo je centralna funkcionalnost aplikacije, jer korisnik ovde započinje planiranje putovanja.

### 3. Rezultati i filteri

Pokazati:

- preporučene opcije
- listu slobodnih vožnji
- filtere po ceni i rejtingu

Poruka za prezentaciju:

Korisnik ne dobija samo jednu vožnju, već pregled više mogućih opcija i može da odabere onu koja mu najviše odgovara.

### 4. Inbox i chat

Pokazati:

- listu razgovora
- aktivni chat
- poruke između korisnika

Poruka za prezentaciju:

Komunikacija je važan deo procesa jer omogućava potvrdu detalja i smanjuje neizvesnost pre same vožnje.

### 5. Profil korisnika

Pokazati sekcije:

- osnovni podaci
- istorija putovanja
- recenzije
- načini plaćanja
- vozilo
- verifikacija

Poruka za prezentaciju:

Profil nije samo pregled podataka, već mehanizam poverenja i transparentnosti između učesnika sistema.

### 6. Objavljivanje vožnje

Pokazati formu za objavu vožnje i objasniti da sistem nije namenjen samo putnicima, već i vozačima koji nude prevoz.

Poruka za prezentaciju:

Na ovaj način aplikacija podržava obe strane procesa, i traženje i nuđenje vožnje.

## Kako predstaviti backend deo

Backend treba prikazati kao servisni sloj koji podržava funkcionalnosti sa frontenda.

### Ključna poruka

Frontend prikazuje korisničke tokove, a backend obezbeđuje podatke, pravila sistema i API komunikaciju.

### 1. Arhitektura

Objasniti da je backend organizovan modularno i da svaki domen ima svoju odgovornost.

Istaknuti module:

- `auth`
- `locations`
- `rides`
- `profile`
- `chat`
- `reviews`
- `payments`
- `vehicles`
- `verifications`

### 2. Baza podataka

Objasniti da backend koristi SQLite i Prisma ORM, kao i da su osnovni modeli:

- korisnik
- lokacija
- vožnja

Poruka za prezentaciju:

Ovi modeli čine jezgro sistema i predstavljaju osnovu za dalji rast aplikacije.

### 3. API sloj

Naglasiti da backend izlaže REST API na `/api/v1` i da je svaka ruta dokumentovana.

Važno je pomenuti:

- registraciju i prijavu korisnika
- učitavanje lokacija
- pretragu vožnji
- objavu vožnje
- pregled profila

### 4. Swagger demonstracija

Tokom prezentacije otvoriti Swagger i pokazati:

- listu ruta
- opis endpoint-a
- request body primere
- response primere

Preporuka je da se posebno pokažu:

- `POST /api/v1/auth/login`
- `GET /api/v1/locations`
- `GET /api/v1/rides/search`
- `POST /api/v1/rides`

### 5. Stub moduli

Ako se pojavi pitanje zašto neki moduli nisu potpuno implementirani, objašnjenje može biti:

Za određene funkcionalne celine definisan je jasan API ugovor i struktura odgovora, čime je obezbeđena konzistentnost sistema i pripremljen prostor za dalje proširenje.

## Preporučeni redosled demonstracije

1. Ukratko predstaviti ideju i problem.
2. Pokazati login i registraciju.
3. Pokazati pretragu i rezultate vožnji.
4. Pokazati chat i profil korisnika.
5. Pokazati formu za objavu vožnje.
6. Preći na backend arhitekturu.
7. Otvoriti Swagger i demonstrirati API rute.
8. Zaključiti prikazom kako frontend i backend čine jedinstven sistem.

## Moguća pitanja i kratki odgovori

### Zašto je aplikacija korisna?

Zato što objedinjavanjem pretrage, komunikacije i pregleda profila pojednostavljuje organizaciju putovanja.

### Zašto postoje i putnik i vozač u sistemu?

Zato što platforma podržava i korisnika koji traži prevoz i korisnika koji nudi slobodna mesta.

### Zašto je Swagger važan?

Zato što omogućava jasan prikaz API integracija, strukture zahteva i odgovora, kao i lakšu komunikaciju između frontend i backend dela.

### Koja je uloga backend-a?

Backend upravlja podacima, pravilima sistema, autentikacijom i izlaganjem API-ja koji podržava funkcionalnosti aplikacije.

## Završna poruka za prezentaciju

SmartMove predstavlja objedinjeno rešenje za planiranje i organizaciju putovanja. Frontend prikazuje kako korisnik prolazi kroz aplikaciju, dok backend obezbeđuje arhitekturu, podatke i API sloj koji takvu aplikaciju čine održivom i proširivom.
